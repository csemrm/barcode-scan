const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Color = require('sf-core/ui/color');
const Label = require('sf-core/ui/label');
const FlexLayout = require('sf-core/ui/flexlayout');
const database = require('../model/database');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const Router = require("sf-core/ui/router");
const System = require('sf-core/device/system');
const Button = require('sf-core/ui/button');
const ImageView = require('sf-core/ui/imageview');
var serail;

console.log("Device.System.OS: " + System.OS);

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
    console.log('onShow' + data);
    
    page.serialNo.text = data;
    

    // serail= data;
    if (System.OS == 'Android') {
        this.headerBar.visible = false;
         this.statusBar.visible = true;
        this.statusBar.android && (this.statusBar.android.color = Color.create("#00A1F1"));
    }
    else {
        this.headerBar.visible = true;
        this.headerBar.title = "Scan Results";
        this.headerBar.titleColor = Color.create("#000000");
        this.headerBar.backgroundColor = Color.create("#FFFFFF");
        this.statusBar.visible = true;

    }

}

// Page.onLoad -> This event is called once when page is created.
function onLoad() {
    const page = this;
      

    if (System.OS == 'Android') {

        var myFlexLayout = new FlexLayout({
            flexGrow: 1,
            width: 400,
            height: 50,
            top: 0,
            left: 0,
            bottom: 0,
            borderColor: Color.GRAY,
            borderWidth: 1,
            right: 0,
            positionType: FlexLayout.PositionType.ABSOLUTE,
            flexDirection: FlexLayout.FlexDirection.ROW,

        });
        page.layout.addChild(myFlexLayout);

        //this.layout.flexDirection = FlexLayout.FlexDirection.ROW;

        var myImageView = new ImageView({
            // image: myImage,
            left: 0,
            width: 48,
            height: 48,
            imageFillType: ImageView.FillType.ASPECTFIT,
            onTouch: function() {
                Router.go("list");
            }
        });

        myImageView.loadFromUrl(
            "https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/arrow_left2-48.png"
        );
        myFlexLayout.addChild(myImageView);


        var myLabel = new Label({
            text: "SCAN RESULTS",
            visible: true,
            marginTop: 8,
            width: 200,
            height: 40,
            textColor: Color.BLACK,
            //marginLeft: 0,
            textAlignment: TextAlignment.MIDCENTER

        });
        myLabel.font = Font.create("Arial", 15, Font.BOLD);
        myFlexLayout.addChild(myLabel);



    }


    var myFlexLayout2 = new FlexLayout({
        flexGrow: 1,
        left: 0,
        right: 0,
        positionType: FlexLayout.PositionType.ABSOLUTE

    });
    page.layout.addChild(myFlexLayout2);

    //var random = Math.floor(Math.random() * 899999 + 100000);
    var serialNo = new Label({
       // text: "Serial No:" + serail,
        visible: true,
        marginTop: 5,
        height: 40,
        textColor: Color.create("#4286f4"),
        textAlignment: TextAlignment.MIDCENTER,

    });


    serialNo.font = Font.create("Arial", 16, Font.BOLD);
    myFlexLayout2.addChild(serialNo);

    if (System.OS == 'Android') {
        serialNo.marginTop = 50;

    }

    var loginButton = new Button({
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
        text: "Submit",
        onPress: function() {
            Router.go("insert", serialNo.text);
        }

    });
    
    page.serialNo=serialNo;
    myFlexLayout2.addChild(loginButton);




}

module && (module.exports = Page_);
