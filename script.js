function renderTransaction(t) {
  const li = document.createElement('li');

  // กำหนดคลาสพื้นหลังและสีตามรายรับ/รายจ่าย
  li.className = `flex justify-between items-center p-3 rounded-md shadow 
                  ${t.amount < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`;

  // สร้างโครงสร้างภายใน <li>
  li.innerHTML = `
    <div>
      <div class="font-semibold">${t.category}</div>
      <div class="text-sm text-gray-700">${t.description}</div>
    </div>
    <div class="text-right font-bold">${t.amount.toFixed(2)} บาท</div>
  `;

  listEl.appendChild(li);
}
