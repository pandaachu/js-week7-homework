// vue filter
// money，千分號轉換說明
export default function (num) {
  const parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return '$' + parts.join('.')
}
