/**
 * Get table column.
 * @param table The table to get the column from.
 * @param columnKey The key of the column to retrieve from the table.
 * @returns The column corresponding to the provided key.
 */
export function getColumn(table: any, columnKey: any): any {
  return table[columnKey] as any;
}
