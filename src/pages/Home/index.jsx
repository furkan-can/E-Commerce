import { Header, Content } from "@/layout";
// import { Button } from "@/components";
// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement } from '@/store/slices/counterSlice';
// import { useNavigate } from "react-router-dom";


const Home = () => {
  // const counterValue = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

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
