const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Color = require('sf-core/ui/color');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const Label = require('sf-core/ui/label');
const FlexLayout = require('sf-core/ui/flexlayout');
const database = require('../model/database');
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const Router = require("sf-core/ui/router");
const ImageView = require('sf-core/ui/imageview');
const SearchView = require('sf-core/ui/searchview');
const System = require('sf-core/device/system');
const Button = require('sf-core/ui/button');
const Image = require('sf-core/ui/image');
const AlertView = require('sf-core/ui/alertview');
console.log("Device.System.OS: " + System.OS);



var myDataSet = [];
var myListView;
const Page_ = extend(Page)(
    // Constructor
    function(_super) {
        // Initalizes super class for this page scope

        _super(this, {
            onShow: onShow.bind(this),
            onLoad: onLoad.bind(this)
        });
    });
//https://github.com/csemrm/barcode-scan
// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {

    const page = this;
     myDataSet = database.list();
     myListView.itemCount = myDataSet.length;
     myListView.refreshData();
     myListView.stopRefresh();

    if (System.OS == 'Android') {
        this.headerBar.visible = false;
        this.headerBar.title = "";
        this.statusBar.android && (this.statusBar.android.color = Color.create("#00A1F1"));
    }else {
        this.headerBar.visible = true;
        this.headerBar.title = "List";
        this.headerBar.titleColor = Color.create("#000000");
        this.headerBar.backgroundColor = Color.create("#FFFFFF");
        this.statusBar.visible = true;
    }

    var myAlertView = new AlertView({
        title: "Need Help?",
        message: "Would you like to insert some demo data?"
    });

    myAlertView.addButton({
        index: AlertView.ButtonType.POSITIVE,
        text: "Okay",
        onClick: function() {
            console.log("Okey clicked.");

            myDataSet = database.insertData();
            page.myListView.itemCount = myDataSet.length;
            page.myListView.refreshData();
            page.myListView.stopRefresh();


        }
    });
    myAlertView.addButton({
        index: AlertView.ButtonType.NEGATIVE,
        text: "Cancel"
    });

    if (!myDataSet.length){
        
        myAlertView.show();
    }
    
  
    
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() {
    const page = this;
    
    if (System.OS == 'iOS') {
      var myItem = new HeaderBarItem({
          title: "Reload",
          onPress: function() {
              myDataSet = database.list();
              myListView.itemCount = myDataSet.length;
              myListView.refreshData();
              myListView.stopRefresh();
          }
      });
      this.headerBar.setItems([myItem]);

      var leftItem = new HeaderBarItem({
          title: "Scan",
          onPress: function() {
              Router.go("scan");
          }
      });
      this.headerBar.setLeftItem(leftItem);
    }

    if (System.OS == 'Android') {

        var myFlexLayout = new FlexLayout({
            flexGrow: 1,
            width: 400,
            height: 50,
            //backgroundColor:Color.RED,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            positionType: FlexLayout.PositionType.ABSOLUTE,
            flexDirection: FlexLayout.FlexDirection.ROW,
            textAlignment: TextAlignment.MIDCENTER

        });
        page.layout.addChild(myFlexLayout);

        //this.layout.flexDirection = FlexLayout.FlexDirection.ROW;

        var addButton = new Label({
            marginTop: 5,
            marginLeft: 10,
            bottom: 0,
            width: 50,
            textColor: Color.create("#5277e5"),
            alignSelf: FlexLayout.AlignSelf.AUTO,
            font: Font.create("Arial", 15, Font.BOLD),
            text: "Scan",
            onTouch: function() {
                Router.go("scan");
            }

        });

        addButton.backgroundColor = Color.WHITE;

        myFlexLayout.addChild(addButton);

        var myLabel = new Label({
            text: "List",
            visible: true,
            marginTop: 5,
            width: 50,
            height: 40,
            textColor: Color.BLACK,
            marginLeft: 80,
            textAlignment: TextAlignment.MIDCENTER,

        });
        myLabel.font = Font.create("Arial", 15, Font.BOLD);
        myFlexLayout.addChild(myLabel);
        var reloadButton = new Label({
            marginTop: 5,
            marginLeft: 110,
            bottom: 0,
            width: 50,
            textColor: Color.create("#5277e5"),
            alignSelf: FlexLayout.AlignSelf.AUTO,
            font: Font.create("Arial", 15, Font.BOLD),
            text: "Reload",

            onTouch: function() {
     
                //myDataSet = database.list();
                myListView.itemCount = myDataSet.length;
                
                console.log('data is from ' + JSON.stringify(myDataSet));
                 
                 myListView.refreshData();
                 myListView.stopRefresh();
            }

        });
        myFlexLayout.addChild(reloadButton);

    }

    var searchBar = new SearchView({
        onTextChanged: function(searchText) {
            console.log("searched text : " + searchText);
            myDataSet = [];
            var data = database.list();
            if (searchText) {

                for (var i = 0,
                        j = data.length; i < j; i++) {
                    var phr = data[i];

                    if (phr.title.toLowerCase().indexOf(searchText.toLowerCase()) != -1) {
                        myDataSet.push(phr);
                        console.log('myDataSet.phr  phr.title ' + phr.title + ' string ' + searchText);
                    }
                }
            }
            else {
                myDataSet = data;
            }
            myListView.itemCount = myDataSet.length;
            myListView.refreshData();
            myListView.stopRefresh();
        }
    });
    
    


    if (System.OS == 'Android') {
        searchBar.width = 340;
        searchBar.height = 40;
        searchBar.left = 10;
        searchBar.borderColor = Color.create("#c8cace");
        searchBar.backgroundColor = Color.WHITE;
        searchBar.borderWidth = 1;
        searchBar.marginTop = 8;
        searchBar.borderRadius = 10;
        //searchBar.top = 20;

        var myFlexLayout2 = new FlexLayout({
            flexGrow: 1,
            width: 400,
            height: 55,
            top: 50,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: Color.create("#d0d2d8"),
            positionType: FlexLayout.PositionType.ABSOLUTE,
            //flexDirection: FlexLayout.FlexDirection.ROW,
            textAlignment: TextAlignment.MIDCENTER

        });


        page.layout.addChild(myFlexLayout2);
        myFlexLayout2.addChild(searchBar);


    }
    else {

        page.layout.addChild(searchBar);



    }



     myListView = new ListView({
        flexGrow: 1,
        rowHeight: 70,
        bottom:0,
        itemCount: myDataSet.length,
        verticalScrollBarEnabled:true
    });
    

    if (System.OS == 'Android') {

        myListView.top = 105;
        myListView.rowHeight= 70;
    }

    myListView.onRowCreate = function() {

        var myListViewItem = new ListViewItem({
            positionType: FlexLayout.PositionType.RELATIVE,
            height: 70,
            borderColor: Color.GRAY,
            borderWidth: 1
        });

        myListViewItem.flexDirection = FlexLayout.FlexDirection.COLUMN;

        var myLabelTitle = new Label({
            id: 102,
            height: 35,
            width: 200,
            marginTop: 5,
            marginLeft: 5,
            textColor: Color.BLACK,
            font: Font.create("Arial", 20, Font.BOLD),
            textAlignment: TextAlignment.MIDLEFT,
            alignSelf: FlexLayout.AlignSelf.AUTO
        });
        myListViewItem.addChild(myLabelTitle);

        var myLabelSubTitle = new Label({
            id: 101,
            height: 30,
            width: 400,
            marginTop: 0,
            marginLeft: 5,
            textColor: Color.GRAY,
            //textColor:Color.BLACK,
            textAlignment: TextAlignment.MIDLEFT,
            alignSelf: FlexLayout.AlignSelf.AUTO
        });
        myListViewItem.addChild(myLabelSubTitle);

        return myListViewItem;
    };

    myListView.onRowBind = function(listViewItem, index) {

        var data = myDataSet[index];
        var myLabelTitle = listViewItem.findChildById(102);
        myLabelTitle.text = data.title;
        var myLabelSubTitle = listViewItem.findChildById(101);
        var subtitle = data.model + ', ' + data.serialNo + ', ' + data.yearOfMaking;
        myLabelSubTitle.text = subtitle;

    };

    myListView.onRowSelected = function(listViewItem, index) {
        console.log("selected index = " + index);
        var dataInfo = myDataSet[index];
        Router.go("edit", dataInfo);
    };

    myListView.onPullRefresh = function() {
        
        
        myDataSet=database.list();
        myListView.itemCount = myDataSet.length;
        myListView.refreshData();
        myListView.stopRefresh();
        
 
    };
    
    myListView.ios.leftToRightSwipeEnabled = true;
    myListView.ios.rightToLeftSwipeEnabled = true;

    page.layout.addChild(myListView);
    page.myListView = myListView;
    
    function dataLoad(){
        
        myDataSet=database.list();
        myListView.itemCount = myDataSet.length;
        myListView.refreshData();
        myListView.stopRefresh();
        
      

    
    }


}

module && (module.exports = Page_);
