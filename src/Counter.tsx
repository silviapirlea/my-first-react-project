import {useState} from "react";


export default function Counter() {
    const [count, setCount] = useState(0);

    function increaseCount(): void {
        setCount((prevCount) => prevCount + 1);
    }

    return (
        <button onClick={increaseCount}>{count}</button>
    )
}