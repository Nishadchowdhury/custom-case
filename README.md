shift + alt + O = get rid of all the unused imports.

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
    we need to know 2 different things. 1. Where is the container on the page. 2.where is the phone case in the container. 5:35:00
    we'll takeout the positions by using refs
    const phoneCaseRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    async function saveConfiguration() {
    // if (!phoneCaseRef.current) return // to get rid from the error of TS cz we destructured "phoneCaseRef.current?.getBoundingClientRect()" but if the ref.current is undefined then the user won't know what happened here and that's why we need to use other way.

           try {
               // const { } = phoneCaseRef.current?.getBoundingClientRect() // it gives the exact coordinates
               const {
                   left: caseLeft,
                   top: caseTop,
                   width,
                   height
               } = phoneCaseRef.current!.getBoundingClientRect() // we're telling TS that we're sure about that we will get the data from it by replacing "?" with "!" here.

               const {
                   left: containerLeft,
                   top: containerTop,
               } = containerRef.current!.getBoundingClientRect();

    } catch (err) {
    // and if any error happens then we will trigger a toast to the user so that they can see what really happened.
    toast({
    title: "Something went wrong!!!",
    description: "There was a problem saving your config, please try again.",
    variant: "destructive",
    })

           }
           }






5:44:00