var root={ name:"ПАО Русполимет"

};
var orgchart = [


    {
        "id": "ЭМП",
        "title":'jhdskajf ajshdfkljajh adskjf kjasdh fk',
        //"parent": "ПАО Русполимет",
        "url":"emp"
    },
    {
        "id": "ККП",
        //"parent": "ПАО Русполимет",
    },

    {
        "id": "КПП",
        //"parent": "ПАО Русполимет",
    },
    {
        "id": "МОП",
        //"parent": "ПАО Русполимет",
    },
    {
        "id": "ЦЭМ",
        "parent": "ЭМП",
        "url":"emp/cem"
    },
    {
        "id": "ЦСЭМ",
        "parent": "ЭМП",
    },
    {
        "id": "Цех подготовки ",
        "parent": "ЭМП",
    },
    {
        "id": "ЭМК DANIELI",
        "parent": "ЦЭМ",
        "url":"emp/cem/danieli"
    },
    {
        "id": "ДСП-6 (EAF)",
        "parent": "ЭЭМК DANIELI",
        "url":"emp/cem/danieli/eaf"
    },
    {
        "id": "Печь-ковш (LRF)",
        "parent": "ЭМК DANIELI",
    },
    {
        "id": "Вакууматор (VOD)",
        "parent": "ЭМК DANIELI",
    },
    {
        "id": "Сталеразливка (HC-81)",
        "parent": "ЭМК DANIELI",
    },
    {
        "id": "ДСП-3",
        "parent": "ЦЭМ",
    },
    {
        "id": "****ЦЭМ",
    },
];

function convert(array){
    var map = {};
    for(var i = 0; i < array.length; i++){
        var obj = array[i];
        obj.children= [];

        map[obj.id] = obj;

        var parent = obj.parent || '-';
        if(!map[parent]){
            map[parent] = {
                children: []
            };
        }
        obj.name=obj.id;
        map[parent].children.push(obj);
    }

    return map['-'].children;

}

root.children=convert(orgchart);
module.exports.orgchart=root;