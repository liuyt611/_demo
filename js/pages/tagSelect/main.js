define(function(require) {
    var $ = require('jquery');
    require('tagselect')($);

    $('#tagSelect').tagSelect({
        list: {
            "abc": [{
                labelId: "191",
                labelName: "a1"
            }, {
                labelId: "192",
                labelName: "a2"
            }, {
                labelId: "193",
                labelName: "a3"
            }, {
                labelId: "194",
                labelName: "a4"
            }],
            "abc1": [{
                labelId: "195",
                labelName: "b1"
            }, {
                labelId: "196",
                labelName: "b2"
            }, {
                labelId: "197",
                labelName: "b3"
            }, {
                labelId: "198",
                labelName: "b4"
            }]
        },
        select: ["192"]
    })
});
