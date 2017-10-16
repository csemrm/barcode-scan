const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const Label = require('sf-core/ui/label');
const TextBox = require('sf-core/ui/textbox');
const Button = require('sf-core/ui/button');
const Router = require("sf-core/ui/router");
const Font = require('sf-core/ui/font');
const ImageView = require('sf-core/ui/imageview');
const Data = require('sf-core/data');
const ScrollView = require('sf-core/ui/scrollview');
const Database = require('sf-core/data').Database;
const Path = require('sf-core/io/path');
const File = require('sf-core/io/file');

const Page_ = extend(Page)(
    // Constructor
    function(_super) {
        // Initalizes super class for this page scope
        _super(this, {
            onShow: onShow.bind(this),
            onLoad: onLoad.bind(this)
        });



    });

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
    const page = this;
    this.headerBar.visible = true;
    this.headerBar.title = "Barcode Scanner";
    this.headerBar.titleColor = Color.create("#ffffff");
    this.headerBar.leftItemEnabled = false;
    this.statusBar.visible = true;
    this.statusBar.android && (this.statusBar.android.color = Color.create("#00A1F1"));

    page.addButton.onPress = function() {

        var database = new Database({
            file: new File({path: Path.DataDirectory + '/barcode.sqlite'})
        });
        database.execute("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES ('page.name.text','page.serialNo.text', 'page.yearOfMaking.text', 'page.model.text', 'page.location12.text')");
        Router.go("view");
        
        //var queryResult = database.query("SELECT * FROM basic_info");
        //console.log("location count is: " + queryResult.count());

    }
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() {
    const page = this;
   
    
     var myFlexLayout = new ScrollView({
        alignSelf: FlexLayout.AlignSelf.STRETCH,
        justifyContent: FlexLayout.JustifyContent.SPACE_AROUND
    }); 
         
    myFlexLayout.layout.alignItems = FlexLayout.AlignItems.CENTER;
    page.layout.addChild(myFlexLayout);
    
     var nametitle = new Label({
        top: 10,
        height: 50,
        text: "Name:",
        visible: true,
        left: 0,
        alignSelf: FlexLayout.AlignSelf.AUTO,
        textColor: Color.create("#1786a5")
    });

    nametitle.font = Font.create("Arial", 16, Font.BOLD);
    var name = new TextBox({
        left: 0,
        top: 10,
        width: 300,
        height: 65,
        hint: "name",
        borderWidth: 1,
        //text: 'ariful',
        alignSelf: FlexLayout.AlignSelf.CENTER,
        borderColor: Color.create("#F0F0F0"),
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
    });

    var serialtitle = new Label({
        top: 10,
        height: 50,
        text: "Serial No:",
        visible: true,
        left: 0,
        alignSelf: FlexLayout.AlignSelf.AUTO,
        textColor: Color.create("#1786a5")
    });

    serialtitle.font = Font.create("Arial", 16, Font.BOLD);
    var serialNo = new TextBox({
        left: 0,
        top: 10,
        width: 300,
        height: 65,
        hint: "Serial No",
        borderWidth: 1,
        //text: 'ariful',
        alignSelf: FlexLayout.AlignSelf.CENTER,
        borderColor: Color.create("#F0F0F0"),
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
    });
    var yearOfMakingtitle = new Label({
        text: "Year of Making:",
        visible: true,
        left: 0,
        top: 10,
        height: 50,
        alignSelf: FlexLayout.AlignSelf.AUTO,
        textColor: Color.create("#1786a5"),
        //top:2,
    });

    yearOfMakingtitle.font = Font.create("Arial", 16, Font.BOLD);

    var yearOfMaking = new TextBox({
        left: 0,
        top: 10,
        width: 300,
        height: 65,
        hint: "Year Of Making",
        borderColor: Color.create("#F0F0F0"),
        alignSelf: FlexLayout.AlignSelf.CENTER,
        //text: '123456',
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
    });

    var modeltitle = new Label({
        text: "Model:",
        visible: true,
        left: 0,
        top: 10,
        height: 50,
        alignSelf: FlexLayout.AlignSelf.AUTO,
        textColor: Color.create("#1786a5"),
        //top:2,
    });

    modeltitle.font = Font.create("Arial", 16, Font.BOLD);

    var model = new TextBox({
        left: 0,
        top: 10,
        width: 300,
        height: 65,
        hint: "Model No",
        borderColor: Color.create("#F0F0F0"),
        alignSelf: FlexLayout.AlignSelf.CENTER,
        //text: '123456',
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
    });

    var locationtitle = new Label({
        text: "Location:",
        visible: true,
        left: 0,
        top: 10,
        height: 50,
        alignSelf: FlexLayout.AlignSelf.AUTO,
        textColor: Color.create("#1786a5"),
        //top:2,
    });

    locationtitle.font = Font.create("Arial", 16, Font.BOLD);

    var location12 = new TextBox({
        left: 0,
        top: 10,
        width: 300,
        height: 65,
        hint: "Location",
        borderColor: Color.create("#F0F0F0"),
        alignSelf: FlexLayout.AlignSelf.CENTER,
        //text: '123456',
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
    });

    var addButton = new Button({
        marginTop: 20,
        bottom: 0,
        width: 250,
        height: 70,
        borderRadius: 10,
        alignSelf: FlexLayout.AlignSelf.CENTER,
        backgroundColor: {
            normal: Color.create("#1786a5"),
            pressed: Color.CYAN
        },
        font: Font.create("Arial", 20, Font.BOLD),
        text: "Add",

    });
    myFlexLayout.addChild(nametitle);
    myFlexLayout.addChild(name);
    myFlexLayout.addChild(serialtitle);
    myFlexLayout.addChild(serialNo);
    myFlexLayout.addChild(yearOfMakingtitle);
    myFlexLayout.addChild(yearOfMaking);
    myFlexLayout.addChild(modeltitle);
    myFlexLayout.addChild(model);
    myFlexLayout.addChild(locationtitle);
    myFlexLayout.addChild(location12);
    myFlexLayout.addChild(addButton);
    page.addButton = addButton;

    page.name = name;
    page.serialNo = serialNo;
    page.yearOfMaking = yearOfMaking;
    page.model = model;
    page.location12 = location12;



}

module && (module.exports = Page_);