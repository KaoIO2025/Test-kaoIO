function addTransaction() {
  const description = document.getElementById('description').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  if (!description || isNaN(amount)) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    return;
  }

  const transaction = { description, amount, category };
  transactions.push(transaction);
  updateUI();

  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
}
