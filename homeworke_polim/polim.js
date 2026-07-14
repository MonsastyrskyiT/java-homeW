//1
class Marker {
  constructor(color, ink = 100) {
    this.color = color;
    this.ink   = ink;      // 0–100 %
  }
 
  print(text) {
    const out = document.getElementById("marker-out");
    let result = "";
 
    for (const ch of text) {
      if (this.ink <= 0) break;
      result += ch;
      if (ch.trim() !== "") {          // не пробіл
        this.ink = Math.max(0, this.ink - 0.5);
      }
    }
 
    const span = document.createElement("span");
    span.style.color = this.color;
    span.textContent = result;
    out.appendChild(span);
 
    const info = document.createElement("div");
    info.className = "info-row";
    info.style.fontSize = "12px";
    info.style.color = "#888";
    info.textContent = ` [залишок чорнил: ${this.ink.toFixed(1)}%]`;
    out.appendChild(info);
    out.appendChild(document.createElement("br"));
  }
}
 
class RefillableMarker extends Marker {
  constructor(color, ink = 100) {
    super(color, ink);
  }

  refill(amount = 100) {
    this.ink = Math.min(100, this.ink + amount);
    const out = document.getElementById("marker-out");
    const div = document.createElement("div");
    div.className = "info-row";
    div.style.color = "green";
    div.textContent = `🖊 Маркер заправлено. Поточний рівень: ${this.ink.toFixed(1)}%`;
    out.appendChild(div);
    out.appendChild(document.createElement("br"));
  }
}

const m1 = new Marker("crimson", 10);
m1.print("Звичайний маркер з 10% чорнил — він надрукує лише частину тексту!");
 
const m2 = new RefillableMarker("steelblue", 5);
m2.print("Маркер з 5% — мало чорнил...");
m2.refill(50);
m2.print("Після заправки на 50% тепер пишемо знову!");
 
//2
 
class ExtendedDate extends Date {

  toTextDate() {
    const months = [
      "січня","лютого","березня","квітня","травня","червня",
      "липня","серпня","вересня","жовтня","листопада","грудня"
    ];
    return `${this.getDate()} ${months[this.getMonth()]}`;
  }

  isFutureOrToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this >= today;
  }

  isLeapYear() {
    const y = this.getFullYear();
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  }
 
  nextDay() {
    const next = new ExtendedDate(this);
    next.setDate(next.getDate() + 1);
    return next;
  }
}
 
// Демонстрація
const out2 = document.getElementById("date-out");
 
const today   = new ExtendedDate();
const past    = new ExtendedDate(2020, 5, 15);   // 15 червня 2020
const future  = new ExtendedDate(2030, 0, 1);    // 1 січня 2030
const leap    = new ExtendedDate(2024, 0, 1);    // 2024 — високосний
const noLeap  = new ExtendedDate(2023, 0, 1);    // 2023 — ні
 
function addRow(label, value) {
  const div = document.createElement("div");
  div.className = "info-row";
  div.innerHTML = `<b>${label}:</b> ${value}`;
  out2.appendChild(div);
}
 
addRow("Сьогодні (текст)", today.toTextDate());
addRow("Сьогодні майбутня?", today.isFutureOrToday());
addRow("Наступний день", today.nextDay().toTextDate() + " " + today.nextDay().getFullYear());
 
addRow("Минула дата (15 червня 2020) текст", past.toTextDate());
addRow("Минула дата — майбутня?", past.isFutureOrToday());
 
addRow("Майбутня (1 січня 2030) текст", future.toTextDate());
addRow("Майбутня дата — майбутня?", future.isFutureOrToday());
 
addRow("2024 — високосний?", leap.isLeapYear());
addRow("2023 — високосний?", noLeap.isLeapYear());
 
//3
 
class Employee {
  constructor(name, position, department, salary) {
    this.name       = name;
    this.position   = position;
    this.department = department;
    this.salary     = salary;
  }
}
 
class EmpTable {
  constructor(employees) {
    this.employees = employees;
  }
 
  getHtml() {
    const rows = this.employees.map(e => `
      <tr>
        <td>${e.name}</td>
        <td>${e.position}</td>
        <td>${e.department}</td>
        <td>${e.salary} грн</td>
      </tr>`).join("");
 
    return `
      <table>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Посада</th>
            <th>Відділ</th>
            <th>Зарплата</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
  }
}
 
const employees = [
  new Employee("Олена Коваль",    "Касир",         "Обслуговування", 18000),
  new Employee("Михайло Бондар",  "Кредитний менеджер", "Кредити",   25000),
  new Employee("Тетяна Шевченко", "Аналітик",      "Ризики",         30000),
  new Employee("Ігор Мельник",    "IT-спеціаліст", "Технології",     35000),
  new Employee("Наталія Лисенко", "Бухгалтер",     "Фінанси",        22000),
];
 
const table = new EmpTable(employees);
document.getElementById("emp-out").innerHTML = table.getHtml();

//4
 
class StyledEmpTable extends EmpTable {
  constructor(employees) {
    super(employees);
  }
 
  getStyles() {
    return `
      <style>
        .emp-table { border-collapse: collapse; width: 100%; font-family: sans-serif; font-size: 14px; }
        .emp-table th { background: #2c5f9e; color: #fff; padding: 10px 14px; text-align: left; }
        .emp-table td { padding: 9px 14px; border-bottom: 1px solid #e0e0e0; }
        .emp-table tr:hover td { background: #eef4ff; }
        .emp-table tr:nth-child(even) td { background: #f7f9fc; }
        .emp-table tr:nth-child(even):hover td { background: #eef4ff; }
      </style>`;
  }
 
  getHtml() {
    const rows = this.employees.map(e => `
      <tr>
        <td>${e.name}</td>
        <td>${e.position}</td>
        <td>${e.department}</td>
        <td>${e.salary} грн</td>
      </tr>`).join("");
 
    const tableHtml = `
      <table class="emp-table">
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Посада</th>
            <th>Відділ</th>
            <th>Зарплата</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
 
    return this.getStyles() + tableHtml;
  }
}
 
const styledTable = new StyledEmpTable(employees);
document.getElementById("styled-out").innerHTML = styledTable.getHtml();
