// ========================================
// ส่วนที่ 2.1 เข้าถึง HTML Element
// ========================================

// เลือก form
const budgetForm = document.querySelector('#budgetForm');

// เลือกพื้นที่แสดงรายการ
const transactionList = document.querySelector('#transactionList');

// เลือกพื้นที่แสดงผลสรุปยอดเงิน
const totalIncome = document.querySelector('#totalIncome');
const totalExpense = document.querySelector('#totalExpense');
const balance = document.querySelector('#balance');


// ========================================
// ส่วนที่ 2.2 สร้าง Array สำหรับเก็บข้อมูล
// ========================================

let budgetArray = [];

// ใช้สร้าง id ให้แต่ละรายการ
let nextId = 1;


// ========================================
// ส่วนที่ 4
// Function แสดงรายการบนหน้าเว็บ
// ========================================

function renderTransactions() {

    // ล้างรายการเดิมก่อน
    // เพื่อป้องกันข้อมูลแสดงซ้ำ
    transactionList.innerHTML = "";

    // วนดูข้อมูลทุก Object ใน Array
    budgetArray.forEach(function (transaction) {

        // สร้าง Element <li>
        const listItem = document.createElement("li");

        // กำหนดข้อความของรายการ
        listItem.textContent =
            transaction.name + " | " +
            transaction.amount + " บาท | " +
            transaction.date + " | " +
            transaction.type + " ";

        // ========================================
        // ส่วนที่ 7 เพิ่มปุ่มลบรายการ
        // ========================================

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "ลบ";
        deleteButton.type = "button";

        // เมื่อกดปุ่มลบ
        deleteButton.addEventListener("click", function () {

            // เก็บเฉพาะรายการที่ id ไม่ตรงกับรายการที่กดลบ
            budgetArray = budgetArray.filter(function (item) {
                return item.id !== transaction.id;
            });

            // แสดงรายการใหม่
            renderTransactions();

            // คำนวณยอดใหม่
            updateSummary();
        });

        // เอาปุ่มลบใส่ใน <li>
        listItem.appendChild(deleteButton);

        // เอา <li> ใส่ใน <ul>
        transactionList.appendChild(listItem);
    });
}


// ========================================
// ส่วนที่ 5
// Function คำนวณรายรับ รายจ่าย ยอดคงเหลือ
// ========================================

function updateSummary() {

    // ----------------------------------------
    // 5.1 หารายการรายรับด้วย filter()
    // ----------------------------------------

    const incomeArray = budgetArray.filter(function (transaction) {
        return transaction.type === "รายรับ";
    });

    // รวมรายรับทั้งหมดด้วย reduce()
    const income = incomeArray.reduce(function (sum, transaction) {
        return sum + transaction.amount;
    }, 0);


    // ----------------------------------------
    // 5.2 หารายการรายจ่ายด้วย filter()
    // ----------------------------------------

    const expenseArray = budgetArray.filter(function (transaction) {
        return transaction.type === "รายจ่าย";
    });

    // รวมรายจ่ายทั้งหมดด้วย reduce()
    const expense = expenseArray.reduce(function (sum, transaction) {
        return sum + transaction.amount;
    }, 0);


    // ----------------------------------------
    // 5.3 คำนวณยอดคงเหลือ
    // ----------------------------------------

    const totalBalance = income - expense;


    // แสดงผลบนหน้าเว็บ
    totalIncome.textContent = "รายรับรวม: " + income + " บาท";

    totalExpense.textContent = "รายจ่ายรวม: " + expense + " บาท";

    balance.textContent = "ยอดคงเหลือ: " + totalBalance + " บาท";
}


// ========================================
// ส่วนที่ 3 รับข้อมูลจากฟอร์ม
// ========================================

budgetForm.addEventListener('submit', function (event) {

    // 3.1 ป้องกันหน้า Refresh
    event.preventDefault();


    // ----------------------------------------
    // 3.2 อ่านค่าจาก Input
    // ----------------------------------------

    const name = document.querySelector('#item').value;

    const amount =
        Number(document.querySelector('#amount').value);

    const date = document.querySelector('#date').value;

    const type =
        document.querySelector('input[name="type"]:checked').value;


    // ========================================
    // ตรวจสอบข้อมูล
    // ========================================

    // ถ้าจำนวนเงินเป็น 0
    if (amount <= 0) {
        alert("จำนวนเงินต้องมากกว่า 0");
        return;
    }


    // ----------------------------------------
    // 3.3 สร้าง Object
    // ----------------------------------------

    const budgetData = {
        id: nextId,
        name: name,
        amount: amount,
        date: date,
        type: type
    };

    // เพิ่ม id สำหรับรายการต่อไป
    nextId++;


    // ----------------------------------------
    // 3.4 เพิ่ม Object ลง Array
    // ----------------------------------------

    budgetArray.push(budgetData);

    console.log("Budget Array:", budgetArray);


    // ========================================
    // ส่วนที่ 6.1
    // เชื่อม Function เข้าด้วยกัน
    // ========================================

    renderTransactions();

    updateSummary();


    // ========================================
    // ส่วนที่ 6.2
    // ล้างข้อมูลใน Form
    // ========================================

    budgetForm.reset();
});