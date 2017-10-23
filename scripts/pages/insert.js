const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Color = require('sf-core/ui/color');
const Image = require("sf-core/ui/image");
const FlexLayout = require('sf-core/ui/flexlayout');
const TextAlignment = require('sf-core/ui/textalignment');
const Label = require('sf-core/ui/label');
const TextBox = require('sf-core/ui/textbox');
const Button = require('sf-core/ui/button');
const Router = require("sf-core/ui/router");
const Font = require('sf-core/ui/font');
const ImageView = require('sf-core/ui/imageview');
const ScrollView = require('sf-core/ui/scrollview');
const database = require('../model/database');
const System = require('sf-core/device/system');
console.log("Device.System.OS: "+ System.OS);

var serialNo;



var myDataSet = [];

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
function onShow(data) {
    
    const page = this;
    serialNo = JSON.stringify(data);
    page.serialNo.text = serialNo;
    
    if(System.OS =='Android'){
        
        //alert('ddd');
        this.headerBar.visible = false;
        this.headerBar.title = "";
        this.statusBar.android && (this.statusBar.android.color = Color.create("#00A1F1"));
       
        
    }else{
    this.headerBar.visible = true;
    this.headerBar.title = "Asset Entry";
    this.headerBar.titleColor = Color.create("#000000");
    this.headerBar.backgroundColor = Color.create("#FFFFFF");
    this.statusBar.visible = true;
    
    }
    
    page.addButton.onPress = function() {

        if (page.name.text == '') {
            alert('Please enter name');
        }else if (page.serialNo.text == '') {
            alert('Please enter serial No');
        }else if (page.model.text == '') {
            alert('Please enter model No');
        }else if (page.yearOfMaking.text == '') {
            alert('Please enter year Of making field ');
        }else if (page.location12.text == '') {
            alert('Please enter location No');
        }else {

            var cmd = ("INSERT INTO basic_info (name,serialNo, yearOfMaking, model, location) VALUES( '" + page.name.text + "' , '" + page.serialNo.text + "','" + page.yearOfMaking.text + "', '" + page.model.text + "','" + page.location12.text + "')");
            var result = database.editData(cmd);
            console.log("result from insert  " + JSON.stringify(result));
            Router.go("list");
        }
    }
    
   
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() {
    const page = this;
   
    
     if (System.OS =='Android'){
  
        var myFlexLayout = new FlexLayout({
            flexGrow:1,
            width:400,
            height:50,
            //backgroundColor:Color.RED,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            borderColor:Color.GRAY,
            borderWidth:1,
            positionType: FlexLayout.PositionType.ABSOLUTE,
            flexDirection: FlexLayout.FlexDirection.ROW,
            textAlignment:TextAlignment.MIDCENTER
            
        });
        page.layout.addChild(myFlexLayout);
        
        //this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        
        /*
        
        var addButton =  new Label({
            marginTop: 5,
            marginLeft: 10,
            bottom: 0,
            width: 50,
            textColor:Color.create("#5277e5"),
            alignSelf: FlexLayout.AlignSelf.AUTO,
            font: Font.create("Arial", 15, Font.BOLD),
            text: "Back",
            onTouch: function() {
                Router.go("list");
           }

    });
    
    addButton.backgroundColor = Color.WHITE;
    myFlexLayout.addChild(addButton);
    
    */
    
    
    var myImageView = new ImageView({
       // image: myImage,
        left: 0,
        width:48,
        height:48,
        imageFillType: ImageView.FillType.ASPECTFIT,
        onTouch: function() {
                Router.go("scan");
           }
    });
    
    myImageView.loadFromUrl(
        "https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/arrow_left2-48.png"
    );
  myFlexLayout.addChild(myImageView);

    
    var myLabel = new Label({
        text: "Asset Entry",
        visible: true,
        marginTop: 5,
        width: 100,
        height: 40,
        textColor:Color.BLACK,
        marginLeft: 80,
        textAlignment:TextAlignment.MIDCENTER,
        
       });
        myLabel.font = Font.create("Arial", 15, Font.BOLD);
        myFlexLayout.addChild(myLabel);
   
    }
    
    this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
    this.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
    this.layout.alignItems = FlexLayout.AlignItems.CENTER;
    
    
    var scrollView = new ScrollView({
        top: 0,
        bottom: 0,
        alignSelf: FlexLayout.AlignSelf.STRETCH,
        justifyContent: FlexLayout.JustifyContent.SPACE_AROUND
    });

    scrollView.layout.alignItems = FlexLayout.AlignItems.CENTER;
    page.layout.addChild(scrollView);

    var nametitle = new Label({
        top: 30,
        marginTop: 20,
        textAlignment: TextAlignment.MIDLEFT,
        text: "Name",
        visible: true,
        height: 30,
        width: 300,
        left: 2,
    });

    nametitle.font = Font.create("Arial", 16, Font.BOLD);
    scrollView.layout.addChild(nametitle);

    var name = new TextBox({
        left: 0,
        top: 20,
        marginTop: 20,
        width: 300,
        height: 65,
        hint: "Name",
        borderWidth: 1,
        //text: 'ariful',
        alignSelf: FlexLayout.AlignSelf.CENTER,
        borderColor: Color.create("#F0F0F0"),
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
    });
    scrollView.layout.addChild(name);

    var serialtitle = new Label({
        top: 20,
        marginTop: 10,
        textAlignment: TextAlignment.MIDLEFT,
        text: "Serial No",
        visible: true,
        height: 30,
        width: 300,
        left: 2,
    });

    serialtitle.font = Font.create("Arial", 16, Font.BOLD);
    scrollView.layout.addChild(serialtitle);

    var serialNo = new TextBox({
        left: 0,
        top: 10,
        width: 300,
        marginTop: 10,
        height: 65,
        hint: "Serial No",
        borderWidth: 1,
        //text:page.serialNo.text ,
        //text: 'ariful',
        alignSelf: FlexLayout.AlignSelf.CENTER,
        borderColor: Color.create("#F0F0F0"),
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
    });
    scrollView.layout.addChild(serialNo);

    var yearOfMakingtitle = new Label({
        top: 20,
        marginTop: 10,
        textAlignment: TextAlignment.MIDLEFT,
        text: "Year Of Making",
        visible: true,
        height: 30,
        width: 300,
        left: 2,
    });

    yearOfMakingtitle.font = Font.create("Arial", 16, Font.BOLD);

    scrollView.layout.addChild(yearOfMakingtitle);

    var yearOfMaking = new TextBox({
        left: 0,
        top: 10,
        width: 300,
        marginTop: 10,
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
    scrollView.layout.addChild(yearOfMaking);
    var modeltitle = new Label({
        top: 20,
        marginTop: 10,
        textAlignment: TextAlignment.MIDLEFT,
        text: "Model",
        visible: true,
        height: 30,
        width: 300,
        left: 2,
        //top:2,
    });


    modeltitle.font = Font.create("Arial", 16, Font.BOLD);
    scrollView.layout.addChild(modeltitle);

    var model = new TextBox({
        left: 0,
        top: 10,
        width: 300,
        marginTop: 10,
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

    scrollView.layout.addChild(model);

    var locationtitle = new Label({
        top: 20,
        marginTop: 10,
        textAlignment: TextAlignment.MIDLEFT,
        text: "Location",
        visible: true,
        height: 30,
        width: 300,
        left: 2,
    });
    locationtitle.font = Font.create("Arial", 16, Font.BOLD);
    scrollView.layout.addChild(locationtitle);

    var location12 = new TextBox({
        left: 0,
        top: 10,
        width: 300,
        height: 65,
        marginTop: 10,
        hint: "Location",
        borderColor: Color.create("#F0F0F0"),
        alignSelf: FlexLayout.AlignSelf.CENTER,
        //text: '123456',
        borderRadius: 5,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
    });

    scrollView.layout.addChild(location12);

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

    scrollView.layout.addChild(addButton);
    page.name = name;
    page.serialNo = serialNo;
    page.yearOfMaking = yearOfMaking;
    page.model = model;
    page.location12 = location12;
    page.addButton = addButton;

}

module && (module.exports = Page_);
