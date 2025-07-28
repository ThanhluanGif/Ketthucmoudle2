function login() {
    const email = prompt("Nhập email:").trim();
    const password = prompt("Nhập password:").trim();

    if (!email || !password) {
        console.log("Hãy nhập đầy đủ thông tin");
        return;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        console.log(`Xin chào ${user.first_name} ${user.last_name}`);
    } else {
        console.log("Thông tin tài khoản không chính xác");
    }
}

function register() {
    const first_name = prompt("Nhập First Name:").trim();
    const last_name = prompt("Nhập Last Name:").trim();
    const email = prompt("Nhập Email:").trim();
    const password = prompt("Nhập Password:").trim();

    if (!first_name || !last_name || !email || !password) {
        console.log("Hãy nhập đầy đủ thông tin");
        return;
    }

    const exists = users.some(u => u.email === email);
    if (exists) {
        console.log("Email này đã có tài khoản");
    } else {
        const newId = Math.max(...users.map(u => u.id)) + 1;
        users.push({ id: newId, first_name, last_name, email, password });
        console.log("Đăng ký thành công! Người dùng mới:", users[users.length - 1]);
    }
}

function viewUsers() {
    const keyword = prompt("Nhập keyword tìm kiếm (để trống xem tất cả):").trim().toLowerCase();

    const filtered = users.filter(u =>
        u.first_name.toLowerCase().includes(keyword) ||
        u.last_name.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword)
    );

    if (filtered.length === 0) {
        console.log("Không tìm thấy user nào.");
        return;
    }

    filtered.forEach(u => {
        console.log(`ID: ${u.id}, Họ tên: ${u.first_name} ${u.last_name}, Email: ${u.email}`);
    });
}

function viewPosts() {
    posts.forEach(post => {
        const user = users.find(u => u.id === post.user_id);
        console.log(`ID: ${post.id}, Title: ${post.title}, Ngày tạo: ${post.created_at}, Người tạo: ${user.first_name} ${user.last_name}`);
    });
}

function viewPostDetail() {
    const postId = Number(prompt("Nhập ID bài post:"));
    const post = posts.find(p => p.id === postId);

    if (!post) {
        console.log("Không tìm thấy bài viết.");
        return;
    }

    const user = users.find(u => u.id === post.user_id);
    console.log(`ID: ${post.id}\nTitle: ${post.title}\nContent: ${post.content}\nImage: ${post.image}\nNgười tạo: ${user.first_name} ${user.last_name}\nNgày tạo: ${post.created_at}\nNgày sửa: ${post.updated_at}`);
}

function searchPostsByUser() {
    const email = prompt("Nhập email user để tìm posts:").trim();
    const user = users.find(u => u.email === email);

    if (!user) {
        console.log("Không tìm thấy user với email này.");
        return;
    }

    const userPosts = posts.filter(p => p.user_id === user.id);
    if (userPosts.length === 0) {
        console.log("User này chưa có bài post nào.");
        return;
    }

    userPosts.forEach(post => {
        console.log(`ID: ${post.id}, Title: ${post.title}, Ngày tạo: ${post.created_at}`);
    });
}

// Menu
function mainMenu() {
    while (true) {
        const choice = prompt("Chọn chức năng:\n1. Đăng nhập\n2. Đăng ký\n3. Xem danh sách Users\n4. Xem danh sách Posts\n5. Xem chi tiết 1 Post\n6. Tìm kiếm Post theo User\n7. Thoát");

        switch (choice) {
            case "1": login(); break;
            case "2": register(); break;
            case "3": viewUsers(); break;
            case "4": viewPosts(); break;
            case "5": viewPostDetail(); break;
            case "6": searchPostsByUser(); break;
            case "7": return;
            default: console.log("Lựa chọn không hợp lệ.");
        }
    }
}

mainMenu();
