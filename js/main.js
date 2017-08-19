(function () {
    'use strict'
    let towers = [{
        disks: []
    },{
        disks: []
    },{
        disks: []
    }],
        n = 9

    initiateGame(n)
    moveTower(n - 1, 0, 2, 1)



    function initiateGame(height) {
        for (let x = height - 1; x >= 0; x--) {
            towers[0].disks.push(x)
        }
        console.log(JSON.stringify(towers))
    }

    function moveDisk(source, dest) {
        let disk = towers[source].disks.pop()
        towers[dest].disks.push(disk)
        console.log(JSON.stringify(towers))
    }

    function moveTower(diskValue, source, dest, spare) {
        if (diskValue === 0) {
            moveDisk(source, dest)
        } else {
            moveTower(diskValue - 1, source, spare, dest)
            moveDisk(source, dest)
            moveTower(diskValue - 1, spare, dest, source)
        }
    }
})()
