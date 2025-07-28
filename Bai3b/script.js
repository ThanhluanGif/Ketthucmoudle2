const teams = [
    { name: "Chelsea", points: 72, GD: 45 },
    { name: "Arsenal", points: 72, GD: 45 },
    { name: "Liverpool", points: 80, GD: 55 },
    { name: "Man City", points: 80, GD: 60 },
    { name: "Tottenham", points: 60, GD: 35 },
    { name: "Brighton", points: 60, GD: 35 },
];


teams.sort((a, b) => {
    if (b.points !== a.points) {
        return b.points - a.points;  
    } else if (b.GD !== a.GD) {
        return b.GD - a.GD;  
    } else {
        return a.name.localeCompare(b.name);  
    }
});

console.log("BẢNG XẾP HẠNG:");
teams.forEach((team, index) => {
    console.log(`${index + 1}. ${team.name} - Points: ${team.points}, GD: ${team.GD}`);
});
