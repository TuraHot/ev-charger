export const getStatusBadge = (status) => {
  const s = status.toLowerCase();
  if (s.includes("available") || s.includes("completed") || s === "เสร็จสิ้น" || s === "พร้อมใช้งาน") return "success";
  if (s.includes("occupied") || s.includes("charging") || s === "กำลังชาร์จ" || s === "กำลังใช้งาน") return "warning";
  if (s.includes("offline") || s.includes("error") || s === "ปิดการใช้งาน") return "danger";
  if (s.includes("maintenance")) return "secondary";
  return "primary";
};