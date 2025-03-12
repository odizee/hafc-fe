import Papa from "papaparse";

export interface CSVInvite {
  email: string;
  role?: string;
}

export async function parseCSV(file: File): Promise<CSVInvite[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: { data: CSVInvite[] }) => {
        const invites = results.data as CSVInvite[];
        // Validate each row has at least an email
        const validInvites = invites.filter(
          (invite) => invite.email && invite.email.includes("@")
        );
        resolve(validInvites);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
