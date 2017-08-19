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
        moves = 0;

    initiateGame(n);

    $('#create').click(function () {
        n = $('#height').val();
        console.log(n);
        initiateGame(n);
    });
    $('#solve').click(function () {
        moveTower(n - 1, 0, 2, 1);
    });

    function clearAll() {
        towers = [{ disks: [] }, { disks: [] }, { disks: [] }];
        $('#tower0').empty();
        $('#tower1').empty();
        $('#tower2').empty();
    }

    function initiateGame(height) {
        clearAll();
        for (var x = height - 1; x >= 0; x--) {
            towers[0].disks.push(x);
        }
        for (var disc in towers[0].disks) {
            createDisk(disc);
        }
        console.log(JSON.stringify(towers));
    }

    function createDisk(width) {
        var disk = document.createElement('div');
        disk.setAttribute('id', "disk" + width);
        disk.setAttribute('class', 'disk');
        document.getElementById('tower0').append(disk);
    }

    function moveDisk(source, dest) {
        moves += 1;

        setTimeout(function () {
            var currentMoves = $('#moves').html();
            var disk = towers[source].disks.pop();
            towers[dest].disks.push(disk);
            $('#disk' + disk).prependTo($('#tower' + dest)).hide().show(500);
        }, moves * 1000);
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
})();
//# sourceMappingURL=main.js.map