import java.util.ArrayList;
import java.util.Scanner;

class Transaction {
    String description;
    double amount;
    String category;

    public Transaction(String description, double amount, String category) {
        this.description = description;
        this.amount = amount;
        this.category = category;
    }

    @Override
    public String toString() {
        return category + " - " + description + " : " + amount + " บาท";
    }
}

public class ExpenseTracker {

    private static ArrayList<Transaction> transactions = new ArrayList<>();
    private static double totalBalance = 0;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("----- ระบบรายรับ-รายจ่าย -----");
            System.out.println("1. เพิ่มรายการ");
            System.out.println("2. แสดงรายการทั้งหมด");
            System.out.println("3. ยอดเงินคงเหลือ");
            System.out.println("4. ลบรายการ");
            System.out.println("5. ออกจากระบบ");
            System.out.print("กรุณาเลือกตัวเลือก: ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // consume newline

            switch (choice) {
                case 1:
                    addTransaction(scanner);
                    break;
                case 2:
                    showTransactions();
                    break;
                case 3:
                    showBalance();
                    break;
                case 4:
                    deleteTransaction(scanner);
                    break;
                case 5:
                    System.out.println("ขอบคุณที่ใช้บริการ!");
                    System.exit(0);
                    break;
                default:
                    System.out.println("ตัวเลือกไม่ถูกต้อง");
            }
        }
    }

    public static void addTransaction(Scanner scanner) {
        System.out.print("กรอกคำอธิบาย: ");
        String description = scanner.nextLine();

        System.out.print("กรอกจำนวนเงิน (+/-): ");
        double amount = scanner.nextDouble();
        scanner.nextLine(); // consume newline

        System.out.println("เลือกหมวดหมู่:");
        System.out.println("1. รายรับ");
        System.out.println("2. อาหาร");
        System.out.println("3. เดินทาง");
        System.out.println("5. ค่าสาธารณูปโภค");
        System.out.print("กรุณาเลือกหมวดหมู่: ");
        int categoryChoice = scanner.nextInt();
        scanner.nextLine(); // consume newline

        String category = "";
        switch (categoryChoice) {
            case 1:
                category = "💼 รายรับ";
                break;
            case 2:
                category = "🍔 อาหาร";
                break;
            case 3:
                category = "🚗 เดินทาง";
                break;
            case 4:
                category = "⚡ ค่าสาธารณูปโภค";
                break;
            default:
                System.out.println("หมวดหมู่ไม่ถูกต้อง");
                return;
        }

        // สร้างรายการใหม่
        Transaction transaction = new Transaction(description, amount, category);
        transactions.add(transaction);

        // คำนวณยอดเงินคงเหลือ
        totalBalance += amount;

        System.out.println("เพิ่มรายการเรียบร้อยแล้ว!");
    }

    public static void showTransactions() {
        if (transactions.isEmpty()) {
            System.out.println("ยังไม่มีรายการ");
        } else {
            System.out.println("รายการทั้งหมด:");
            for (int i = 0; i < transactions.size(); i++) {
                System.out.println((i + 1) + ". " + transactions.get(i));
            }
        }
    }

    public static void showBalance() {
        System.out.println("ยอดเงินคงเหลือ: " + totalBalance + " บาท");
    }

    // ฟังก์ชันลบรายการ
    public static void deleteTransaction(Scanner scanner) {
        if (transactions.isEmpty()) {
            System.out.println("ไม่มีรายการที่จะลบ");
            return;
        }

        showTransactions(); // แสดงรายการทั้งหมด

        System.out.print("กรุณาเลือกหมายเลขรายการที่ต้องการลบ: ");
        int index = scanner.nextInt();
        scanner.nextLine(); // consume newline

        if (index < 1 || index > transactions.size()) {
            System.out.println("หมายเลขรายการไม่ถูกต้อง");
        } else {
            // หักลบจำนวนเงินจากยอดคงเหลือ
            totalBalance -= transactions.get(index - 1).amount;

            // ลบรายการ
            transactions.remove(index - 1);
            System.out.println("ลบรายการเรียบร้อยแล้ว!");
        }
    }
}
