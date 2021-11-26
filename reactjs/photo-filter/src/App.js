import './App.css';
import Slider from './components/Slider';
import Canvas from './components/Canvas';
import ImageSidebar from './components/ImageSidebar';
import FilterSidebar from './components/FilterSidebar';
import { useEffect, useRef, useState } from 'react';
const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
]

function App() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [selectOptionIndex, setSelectOptionIndex] = useState(0)
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const selectOption = options[selectOptionIndex]
  const handleLoadImage = (e) => {
    imageRef.current = e.target
    resetImage()
    // const canvas = canvasRef.current
    // const context = canvas.getContext('2d')
    // canvas.width = e.target.naturalWidth
    // canvas.height = e.target.naturalHeight
    // context.drawImage(e.target, 0, 0)
  }
  const handeleSliderChange = (e) => {
    if (imageRef.current === null) {
      return
    }
    const selectOptionChange = { ...selectOption, value: e.target.value }
    setOptions(options.map(option => option.name === selectOptionChange.name ? selectOptionChange : option))
    draw()
  }
  const getFilterString = () => {
    const filter = options.map(option => `${option.property}(${option.value}${option.unit})`)
    console.log(filter);
    return filter.join(' ')
  }
  const draw = () => {
    const canvas = canvasRef.current
    canvas.width = imageRef.current.naturalWidth
    canvas.height = imageRef.current.naturalHeight
    const context = canvas.getContext('2d')
    context.filter = getFilterString()
    context.drawImage(imageRef.current, 0, 0)
  }
  const resetImage = () => {
    setOptions(DEFAULT_OPTIONS)
    setSelectOptionIndex(0)
    draw()
  }
  const downloadImage = () => {
    const canvas = canvasRef.current
    const dataURL = canvas.toDataURL("image/png",1).replace("image/png", "image/octet-stream");
    let link = document.createElement('a');
    link.setAttribute('download', 'imagefilter.png');
    link.setAttribute('href', dataURL);
    link.click();
  }
  return (
    <div className="container">
      <div className="main-image">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="sidebar">
        <ImageSidebar handleLoadImage={handleLoadImage} resetImage={resetImage} downloadImage={downloadImage} />
        {options.map((option, index) =>
          <FilterSidebar key={index} name={option.name}
            active={selectOptionIndex === index}
            handleSelectSidebar={() => setSelectOptionIndex(index)}
          />
        )}
      </div>
       <Slider min={selectOption.range.min} max={selectOption.range.max}
        value={selectOption.value} handleChange={handeleSliderChange} />
    </div>
  );
}

export default App;
