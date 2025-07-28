function uniqueElements(A1, A2) {
    const uniqueA1 = A1.filter(item => !A2.includes(item));
    const uniqueA2 = A2.filter(item => !A1.includes(item));
    return [...uniqueA1, ...uniqueA2];
}

const inputA1 = prompt("Nhập các phần tử mảng A1");
const A1 = inputA1.split(',').map(item => item.trim());

const inputA2 = prompt("Nhập các phần tử mảng A2");
const A2 = inputA2.split(',').map(item => item.trim());

const result = uniqueElements(A1, A2);
console.log(result);  
