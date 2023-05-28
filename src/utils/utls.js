export const getIdNumber = ({ updatedAt, pid, id }) => {
  console.log("updatedAt", updatedAt);
  const prefix = "AEC";
  const year = new Date(updatedAt).getFullYear().toString().substring(1);
  console.log("pid", pid);
  return `${prefix}${pid}${year}ID${id}`;
};
