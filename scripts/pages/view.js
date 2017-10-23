const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Color = require('sf-core/ui/color');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const Label = require('sf-core/ui/label');
const FlexLayout = require('sf-core/ui/flexlayout');
const Database = require('sf-core/data').Database;
const Path = require('sf-core/io/path');
const File = require('sf-core/io/file');
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const Router = require("sf-core/ui/router");
const database = new Database({
            file: new File({path: Path.DataDirectory + '/barcode.sqlite'})
        });
database.execute("DROP TABLE basic_info");
database.execute("CREATE TABLE IF NOT EXISTS basic_info ( 'id' INTEGER AUTOINCREMENT, 'name' TEXT ,'serialNo' TEXT , 'yearOfMaking' TEXT, 'model' TEXT, 'location' TEXT , PRIMARY KEY('id') )");
database.execute("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES ('lorem1','001', '2017', 'test001', 'Savar')");
database.execute("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES ('lorem2','002', '2017', 'test002', 'dhaka')");
database.execute("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES ('lorem3','003', '2017', 'test003', 'Comilla')");
database.execute("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES ('lorem1','001', '2017', 'test004', 'Feni')");
database.execute("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES ('lorem2','002', '2017', 'test005', 'Begerhat')");
database.execute("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES ('lorem3','003', '2017', 'test006', 'Narshingdi')");

    

const Page_ = extend(Page)(
	// Constructor
	function(_super){
		// Initalizes super class for this page scope
		
		_super(this, {
		    onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		});
});
//https://github.com/csemrm/barcode-scan
// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
    this.headerBar.visible = true;
    this.headerBar.title = "List";
    this.headerBar.titleColor = Color.create("#000000");
    this.headerBar.backgroundColor = Color.create("#FFFFFF");
    this.statusBar.visible = true;
    this.statusBar.android && (this.statusBar.android.color = Color.create("#00A1F1"));
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() {
    const page = this;
    var myItem = new HeaderBarItem({
        title: "Reload",
        onPress: function() {
                    Router.go("view");
                }
                });
    this.headerBar.setItems([myItem]);

    var leftItem = new HeaderBarItem({
        title : "Add",
        onPress: function() {
                    alert("You pressed Done item!");
                }
        }); 
    this.headerBar.setLeftItem(leftItem);

    var queryResult = database.query("SELECT * FROM basic_info WHERE 1");
    var myDataSet = [];
    //console.log('queryResult ' + queryResult.count() );
    for(var i = 0; i < queryResult.count() ; i++){
    // Getting person
    var basic_info = queryResult.get(i);
    
     myDataSet.push( {
        title: basic_info.getString('name'), 
        serialNo: basic_info.getString('serialNo'), 
        yearOfMaking: basic_info.getString('yearOfMaking'), 
        model: basic_info.getString('model'), 
        location: basic_info.getString('location'),
        id: basic_info.getString('id'),
    } );
}
 console.log('data is'+JSON.stringify(myDataSet));
database.close( );
    

var myListView = new ListView({
    flexGrow:1,
    rowHeight: 70,
//    rowHeight: 60,
    backgroundColor: Color.WHITE,
    itemCount: myDataSet.length,
    justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN
});

myListView.onRowCreate = function(){
    var myListViewItem = new ListViewItem({
        backgroundColor : Color.WHITE,
        positionType: FlexLayout.PositionType.RELATIVE,
        
    });
    var myLabelTitle = new Label({
        id: 102,
        height: 30, 
        font : Font.create("Arial", 16, Font.BOLD),
        textAlignment: TextAlignment.MIDLEFT,
        alignSelf: FlexLayout.AlignSelf.AUTO
    });
    myListViewItem.addChild(myLabelTitle);
    
    var myLabelSubTitle = new Label({
        id: 101,
        height: 30, 
        textAlignment: TextAlignment.MIDCENTER,
        alignSelf: FlexLayout.AlignSelf.AUTO
    });
    myListViewItem.addChild(myLabelSubTitle);
    
    return myListViewItem;
};

myListView.onRowBind = function(listViewItem,index){
    var myLabelTitle = listViewItem.findChildById(102);
    myLabelTitle.text = myDataSet[index].title;
    var myLabelSubTitle = listViewItem.findChildById(101);
    myLabelSubTitle.text = myDataSet[index].serialNo+', '+ myDataSet[index].yearOfMaking+', '+ myDataSet[index].location;
    
};

myListView.onRowSelected = function(listViewItem,index){
    console.log("selected index = " + index)
};

myListView.onPullRefresh = function(){
    
    myListView.itemCount = myDataSet.length;
    myListView.refreshData();
    myListView.stopRefresh();
};

myListView.ios.leftToRightSwipeEnabled = true;
myListView.ios.rightToLeftSwipeEnabled = true;

page.layout.addChild(myListView);
page.myListView = myListView;
    
    
}

module && (module.exports = Page_);