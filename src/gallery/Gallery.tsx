import Profile from "../profile/Profile.tsx";

export default function Gallery() {
    return (
        <section>
            <h1>Amazing scientists</h1>
            <Profile profileName={'Silvia1'} age={22}/>
            <Profile profileName={'Silvia2'} age={22}/>
            <Profile profileName={'Silvia3'} age={22}/>
        </section>
    );
}