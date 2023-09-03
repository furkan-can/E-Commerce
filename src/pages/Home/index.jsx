import { Header, Content } from "@/layout";
// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement } from '@/store/slices/counterSlice';


const Home = () => {
  // const counterValue = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();

  return (
    <>
      <Header />
      <Content />
      {/* <Button text={"Go About Page (Control Redux-Toolkit)"} onClick={() => navigate("/about")} /> */}

      {/* <div className="flex flex-col">
        <h2>Counter</h2>
        <p>Value: {counterValue}</p>

        <Button text={"Increment"} onClick={() => dispatch(increment())} />

        <Button text={"Decrement"} onClick={() => dispatch(decrement())} />
      </div> */}

    </>
  )
}


export default Home
