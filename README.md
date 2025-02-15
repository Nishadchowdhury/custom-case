shift + alt + O = get rid of all the unused imports.

------------------------------------------Advance Typescript------------------------------------------
1.  inhering types from other interfaces we can use extends but for a particular interface we can use Pick<Interface, "keyName">


getting the cropped image through the canvas. 5:25:00

There Is X steps to get the cropped image
=> we need to track the coordinates"position of the image in the container" and the dimensions"size of the image" of the image.

1.  create a state to store the initial dimensions of the image.
    const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4
    })
2.  create another state to store the initial position of the image in the container. // need to calculate it experimentally
    const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205
    })

3.  Now we will read the interacted positions from the Rnd component and update the states.
    1-
    onResizeStop={(-, --, ref, ---, { x, y }) => { // - (underscores) means we won't use this var.
    setRenderedDimension({
    height: parseInt(ref.style.height.slice(0, -2) /_50px_/),
    width: parseInt(ref.style.width.slice(0, -2)) /_50px_/
    })
    setRenderedPosition({ x, y }) // setting the position also.
    }} // this event will trigger when the resize event is triggered.

    2-
    onDragStop={(-, data) => {
    const { x, y } = data;
    setRenderedPosition({ x, y }); // resetting the position after
    }}

4.  then we need an async function to generate the cropped image and store that into clouds.
    1-
    we need to know 2 different things. 1. Where is the container on the page. 2- calculate where is the phone case in the container. 5:35:00
    we'll takeout the positions by using refs
    const phoneCaseRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    3- need an async function to calculate and generate the cropped image to store.

    1. calculation:-  
        const {// taking the position of case
       left: caseLeft, // distance from the window to the element.
       top: caseTop, // we need to work with another width property in this func that's why renaming the mandatory.
       width, // rendered caseWidth
       height // rendered caseHeight
       // this height and width we can use to create the canvas
       } = phoneCaseRef.current!.getBoundingClientRect() // we're telling TS that we're sure about that we will get the data from it by replacing "?" with "!" here.

       const { // taking the position of outer container
       left: containerLeft,
       top: containerTop,
       } = containerRef.current!.getBoundingClientRect(); //returns the size of an element and its position relative to the viewport.

       const actualX = renderedPosition.x - leftOffset // distance of the image - distance of cover from container = distance of the image in the cover.
       const actualY = renderedPosition.y - topOffset

5.  creating a canvas same as the cover.

    const canvas = document.createElement('canvas') // create a canvas to print things.
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d') // context allows to modify the canvas and draw things.

6.  create an image instance to draw into the canvas

    const userImage = new Image(); // to get the image that we want to draw into the canvas.
    userImage.crossOrigin = 'anonymous'; // it will prevent occurring any CORS errors.
    userImage.src = imageUrl;
    await new Promise((resolve, reject) => (userImage.onload = resolve)) // waiting to create the image 'new Image()'
    // now the image is fully loaded and ready to be drawn into the canvas.

    ctx?.drawImage(
    userImage,
    actualX, // calculated position from the visual elements
    actualY,
    renderedDimension.width, // final sizes of the image (dimensions)
    renderedDimension.height,
    )

7.  exporting the image

    const base64 = canvas.toDataURL() // this is the best way to convert a canvas to a base64 =it returns> a really long string contains the image data in base64 formate.
    const base64data = base64.split(',')[1] // [info of base64, theBase64String]
    const blob = base64ToBlob(base64data, "image/png")
    const file = new File([blob], String('CROP\_' + Date.now() + "\_file.png"), { type: "image/png" });
    // 6.00.00

    ---------------- function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

        const byteArray = new Uint8Array(byteNumbers) //
        return new Blob([byteArray], { type: mimeType })

    }

8.  store the image to a bucket and info to a DB
    await startUpload([file], {
    configId
    })

7 end : 5:55:20

------------------------------------------Uploadthing------------------------------------------

1. one thing is most important that is do not forget to add this variable to production environment variable as "UPLOADTHING_URL = https://domain.xxx" "

------------------------------------------integration stripe------------------------------------------

1. Install and create a file in lib folder "Stripe.ts" and import Stripe from "stripe";
2. export stripe after creating instance of Stripe like const = new Stripe(process.env.SSK ?? '', {apiVersion: "", typescriptL:true}). Initial setUp of stripe is done.
3. Create the product in stripe by providing the product's details
   --- const product = await stripe.products.create({
   name: "Custom Iphone Case",
   images: [configuration.imageUrl],
   default_price_data: {
   currency: "USD",
   unit_amount: price,
   },
   });
4. now it's the time to create the actual payment session
5. now need to create an action to run the function create a payment session.
   1.check the user and the configuration. Then check the order exist or not, if not create. 2. to create a payment session need to create a product. 3. Using the product create a payment session 4. return the payment page.

------------------------------------- Tailwind css advance -------------------------------------

1.  divide-x divide-gray-200 => it adds dividers after and before the elements in a grid and first and last child elements won't get the divider border.
2.  we can tun any element to shadCn-button by providing buttonVariants in classNames <LoginLink className={buttonVariants({ variant: "outline" })} >Login</LoginLink>

-------------------------------------- Payment flow -----------------------------------------------

1. from preview page user will click CONTINUE button and that bull lead to stripe's hosted payment page.
2. when the user paid by a card/system, stripe will send us something called a webhook _webhook is an API call when payment done stripe will call the API that we will create in our next js app_ the web hook will be called following the rote that we provided on stripe website in webhook configuration and the route must be a hosted website url.
3. Being called the API means the user paid and now the _product_ must be ready for shipment. In this API will determine what next should happen.
4.

-------------------------------------- Sending Email --------------------------------------------------

1.  React email component:- that helps to create email layout for us and add custom styles to design it.
2.  resend:- it is SMTP server that deliveries the email to the addresses, It usage AWS to do the operation. It take a few stapes.

    1.  create an api key from resend.com
    2.  construct resend instance in webhook file where we wrote the code to validate the stripe signature.
    3.  then right after the being db operation compensation we need to make an API call like below.
        await resend.emails.send({
        from: "Custom Case <nishadhj111@gmail.com>", // give the email that owns the API key.
        to: [event.data.object.customer_details.email],
        subject: "Thanks for your order!",
        react: OrderReceivedEmail({
        orderId,
        orderDate: updatedOrder.createdAt.toLocaleDateString(),

              //@ts-ignore
              shippingAddress: {
                name: session.customer_details!.name!,
                street: shippingAddress!.line1!,
                city: shippingAddress!.city!,
                postalCode: shippingAddress!.postal_code!,
                country: shippingAddress!.country!,
                state: shippingAddress!.state!,
              },
            }),

        });

--------------------------------------------metadata --------------------------------------------

1.lib>utils.ts file create a function like bellow.


