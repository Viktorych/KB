//if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
//$(document).ready(function () {

    var $ = go.GraphObject.make;  // for conciseness in defining templates
    var myDiagram =
        $(go.Diagram, "main_structure",  // the DIV HTML element
            {
                // Put the diagram contents at the top center of the viewport
                initialDocumentSpot: go.Spot.TopCenter,
                initialViewportSpot: go.Spot.TopCenter,
                // OR: Scroll to show a particular node, once the layout has determined where that node is
                //"InitialLayoutCompleted": function(e) {
                //  var node = e.diagram.findNodeForKey(28);
                //  if (node !== null) e.diagram.commandHandler.scrollToPart(node);
                //},
                layout:
                    $(go.TreeLayout,  // use a TreeLayout to position all of the nodes
                        {
                            treeStyle: go.TreeLayout.StyleLastParents,
                            // properties for most of the tree:
                            angle: 90,
                            layerSpacing: 80,
                            // properties for the "last parents":
                            alternateAngle: 0,
                            alternateAlignment: go.TreeLayout.AlignmentStart,
                            alternateNodeIndent: 20,
                            alternateNodeIndentPastParent: 1,
                            alternateNodeSpacing: 20,
                            alternateLayerSpacing: 40,
                            alternateLayerSpacingParentOverlap: 1,
                            alternatePortSpot: new go.Spot(0.001, 1, 20, 0),
                            alternateChildPortSpot: go.Spot.Left
                        })
            });



// define Converters to be used for Bindings
    function theNationFlagConverter(nation) {
        return "https://www.nwoods.com/go/Flags/" + nation.toLowerCase().replace(/\s/g, "-") + "-flag.Png";
    }

    function theInfoTextConverter(info) {
        var str = "";
        if (info.post) str += "" + info.post;
        if (info.surname) str += "\n" + info.surname;
        if (info.phone) str += "\nтел. " + info.phone;
        if (typeof info.boss === "number") {
            var bossinfo = myDiagram.model.findNodeDataForKey(info.boss);
            if (bossinfo !== null) {
                str += "\n\nReporting to: " + bossinfo.name;
            }
        }
        return str;
    }

// define the Node template
    myDiagram.isReadOnly = true;
    myDiagram.nodeTemplate =
        $(go.Node,
            "Auto",
            // the outer shape for the node, surrounding the Table
            {
                doubleClick: function (e, obj) {
                    window.location = "/" + obj.data.url;
                }
            },
            $(go.Shape, "Rectangle",
                {stroke: null, strokeWidth: 1},
                /* reddish if highlighted, blue otherwise */
                new go.Binding("fill", "isHighlighted", function (h) {
                    return h ? "#F44336" : "#A7E7FC";
                }).ofObject()),
            // a table to contain the different parts of the node
            $(go.Panel, "Table",
                {margin: 6, maxSize: new go.Size(200, NaN)},
                // the two TextBlocks in column 0 both stretch in width
                // but align on the left side
                $(go.RowColumnDefinition,
                    {
                        column: 0,
                        stretch: go.GraphObject.Horizontal,
                        alignment: go.Spot.Left
                    }),
                // the name
                $(go.TextBlock,
                    {
                        row: 0, column: 0,
                        maxSize: new go.Size(200, NaN), margin: 2,
                        font: "500 16px Roboto, sans-serif",
                        alignment: go.Spot.Top,
                        textAlign: "center",
                    },
                    new go.Binding("text", "id")),
                // the country flag
                /*
                $(go.Picture,
                    {
                        row: 0, column: 1, margin: 2,
                        imageStretch: go.GraphObject.Uniform,
                        alignment: go.Spot.TopRight
                    },
                    // only set a desired size if a flag is also present:



                    new go.Binding("desiredSize", "nation", function(){ return new go.Size(34, 26) }),
                    new go.Binding("source", "nation", theNationFlagConverter)),

                // the additional textual information
                */
                $(go.TextBlock,
                    {
                        row: 1, column: 0, columnSpan: 2,
                        font: "italic 12px Roboto, sans-serif",

                        textAlign: "center",
                    },
                    new go.Binding("text", "", theInfoTextConverter))
            )  // end Table Panel
        );  // end Node
// define the Link template, a simple orthogonal line
    myDiagram.linkTemplate =
        $(go.Link, go.Link.Orthogonal,
            {corner: 5, selectable: false},
            $(go.Shape, {strokeWidth: 3, stroke: "#424242"}));  // dark gray, rounded corner links

// create the Model with data for the tree, and assign to the Diagram
    myDiagram.model =
        $(go.TreeModel,
            {
                nodeParentKeyProperty: "parent",
                nodeKeyProperty: "id",
                // this property refers to the parent node data
                nodeDataArray: main_structure_data
            });
// Overview

    myOverview =
        $(go.Overview, "overview",  // the HTML DIV element for the Overview
            {observed: myDiagram, contentAlignment: go.Spot.Center});   // tell it which Diagram to show and pan

// the Search functionality highlights all of the nodes that have at least one data property match a RegExp
    function searchDiagram() {  // called by button
        var input = document.getElementById("mySearch");
        console.log("sdfgsd")
        if (!input) return;
        input.focus();
        myDiagram.startTransaction("highlight search");
        if (input.value) {
            // search four different data properties for the string, any of which may match for success
            // create a case insensitive RegExp from what the user typed
            var regex = new RegExp(input.value, "i");
            var results = myDiagram.findNodesByExample({id: regex});
            myDiagram.highlightCollection(results);
            // try to center the diagram at the first node that was found
            if (results.count > 0) myDiagram.centerRect(results.first().actualBounds);
        } else {  // empty string only clears highlighteds collection
            myDiagram.clearHighlighteds();
        }
        myDiagram.commitTransaction("highlight search");
    }

//});
