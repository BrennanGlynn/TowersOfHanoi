'use strict';

(function () {
    'use strict';

    var towers = [{
        disks: []
    }, {
        disks: []
    }, {
        disks: []
    }],
        n = 10,
        speed = 5,
        moves = 0,
        timeouts = [];

    initiateGame(n);

    $('#create').click(function () {
        n = $('#height').val();
        clearAll();
        initiateGame(n);
    });
    $('#solve').click(function () {
        console.log("Towers: " + JSON.stringify(towers));
        console.log("n: " + n);
        console.log("speed: " + speed);
        console.log("moves: " + moves);
        console.log("timeouts: " + timeouts);
        moveTower(n - 1, 0, 2, 1);
    });

    function clearAll() {
        clearTimeouts(timeouts);
        moves = 0;
        towers = [{ disks: [] }, { disks: [] }, { disks: [] }];
        $('#tower0').empty();
        $('#tower1').empty();
        $('#tower2').empty();
    }

    function initiateGame(height) {
        for (var x = height - 1; x >= 0; x--) {
            towers[0].disks.push(x);
        }
        for (var disc in towers[0].disks) {
            createDisk(disc);
        }
    }

    function createDisk(width) {
        var disk = document.createElement('div');
        disk.setAttribute('id', "disk" + width);
        disk.setAttribute('class', 'disk');
        document.getElementById('tower0').append(disk);
    }

    function moveDisk(source, dest) {
        moves += 1;

        timeouts.push(setTimeout(function () {
            var disk = towers[source].disks.pop();
            towers[dest].disks.push(disk);
            $('#disk' + disk).prependTo($('#tower' + dest)).hide().show(500 / speed);
        }, moves * 1000 / speed));
    }

    function moveTower(diskValue, source, dest, spare) {
        if (diskValue === 0) {
            moveDisk(source, dest);
        } else {
            moveTower(diskValue - 1, source, spare, dest);
            moveDisk(source, dest);
            moveTower(diskValue - 1, spare, dest, source);
        }
    }

    function clearTimeouts(timeoutArray) {
        for (var i = 0; i < timeoutArray.length; i++) {
            clearTimeout(timeoutArray[i]);
        }
        timeouts = [];
    }
})();
//# sourceMappingURL=main.js.map