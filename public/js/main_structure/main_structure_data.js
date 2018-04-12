var main_structure_data = [
    {
        "id": "ПАО Русполимет",
        "parent": "#",
    },
    {
        "id": "Электрометаллургическое производство",
        "parent": "ПАО Русполимет",
        "url":"emp"
    },
    {
        "id": "Ковочное производство",
        "parent": "ПАО Русполимет",
    },

    {
        "id": "Корльцепрокатное производство",
        "parent": "ПАО Русполимет",
    },
    {
        "id": "Механообрабатывающие производство",
        "parent": "ПАО Русполимет",
    },
    {
        "id": "Цех электрометаллургии",
        "parent": "Электрометаллургическое производство",
        "url":"emp/cem"
    },
    {
        "id": "Цех спец. электрометаллургии",
        "parent": "Электрометаллургическое производство",
    },
    {
        "id": "Цех подготовки металлургии",
        "parent": "Электрометаллургическое производство",
    },
    {
        "id": "Электрометаллургический комплекс DANIELI",
        "parent": "Цех электрометаллургии",
        "url":"emp/cem/danieli"
    },
    {
        "id": "ДСП-6 (EAF)",
        "parent": "Электрометаллургический комплекс DANIELI",
        "url":"emp/cem/danieli/eaf"
    },
    {
        "id": "Печь-ковш (LRF)",
        "parent": "Электрометаллургический комплекс DANIELI",
    },
    {
        "id": "Вакууматор (VOD)",
        "parent": "Электрометаллургический комплекс DANIELI",
    },
    {
        "id": "Сталеразливка (HC-81)",
        "parent": "Электрометаллургический комплекс DANIELI",
    },
    {
        "id": "ДСП-3",
        "parent": "Цех электрометаллургии",
    },
    {
        "id": "*****",
        "parent": "Цех электрометаллургии",
    },
];

function getStructureData() {
    StructureData = [];
    main_structure_data.forEach(function (item, i, arr) {
        item.text = item.id;
        item.state={opened: true};
        if (item.parent !== "#") {
            //item.icon = "jstree-file";
        }
/*
        state       : {
            opened    : boolean  // is the node open
            disabled  : boolean  // is the node disabled
            selected  : boolean  // is the node selected
        },
*/

        StructureData.push(item);
        //console.log(ManningtableData)
    });
    return StructureData;

}
