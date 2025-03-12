"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Info, FileText } from "lucide-react";
import { parseCSV, type CSVInvite } from "@/lib/csv";
import { useForm } from "react-hook-form";
import { useBulkInviteUserMutation } from "@/redux/services/auth/authApi";

export function BulkInvite() {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [invites, setInvites] = useState<CSVInvite[]>([]);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    // resolver: useYupValidationResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      role: "",
      email: "",
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      try {
        const parsedInvites = await parseCSV(selectedFile);
        setInvites(parsedInvites);
        toast({
          title: "CSV Loaded",
          description: `Found ${parsedInvites.length} valid entries`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to parse CSV file",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
    }
  };

  const [bulkInviteUser, { isError, isSuccess, isLoading }] =
    useBulkInviteUserMutation();

  const handleSubmitInvite = async () => {
    try {
      const data = await bulkInviteUser({ invitations: invites }).unwrap();
      toast({ title: "Invites Sent", description: data?.message });

      // Check for failed invitations
      if (data.failed && data.failed.length > 0) {
        data.failed.forEach((fail: { email: any; reason: any }) => {
          toast({
            description: `Failed to invite ${fail.email}: ${fail.reason}`,
            variant: "destructive",
          });
        });
      }

      // Check for successful invitations
      if (data.success && data.success.length > 0) {
        data.success.forEach((email: any) => {
          toast({
            description: `Successfully invited ${email}`,
          });
        });
      }

      setFile(null);
      setInvites([]);
    } catch (e: any) {}
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitInvite)} className="space-y-4">
      <div className="space-y-2">
        <Label>Upload CSV</Label>
        <div className="text-sm text-muted-foreground flex items-center space-x-2 mb-2">
          <Info className="h-4 w-4" />
          <span>CSV should include columns: email (required), role</span>
        </div>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <input
            type="file"
            id="csv-upload"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="csv-upload"
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {file ? file.name : "Click to upload CSV"}
            </span>
          </label>
        </div>
      </div>

      {invites.length > 0 && (
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>{invites.length} entries loaded</span>
            </div>
            <div className="max-h-32 overflow-y-auto">
              {invites.slice(0, 5).map((invite, i) => (
                <div key={i} className="text-sm">
                  {invite.email} {invite.role && `- ${invite.role}`}
                </div>
              ))}
              {invites.length > 5 && (
                <div className="text-sm text-muted-foreground">
                  ...and {invites.length - 5} more
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading || !file || invites.length === 0}
        className="w-full"
      >
        {isLoading ? "Sending..." : "Send Invitations"}
      </Button>
    </form>
  );
}
