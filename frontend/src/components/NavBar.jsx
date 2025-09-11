    import MenuIcon from '@mui/icons-material/Menu';

    export default function NavBar() { 
        

        return (
            <div className="h-[100vh] w-[100vw] flex flex-col gap-2">

                <div className="h-[10%] w-full bg-primary flex
                flex-row items-center px-4 py-2">
                    
                    <div className="font-logo text-5xl tracking-wider
                    font-bold ">
                        ///
                    </div>

                    <div className='flex flex-row gap-1 text-[0.8rem]'>

                        <h1>HOME</h1>
                        <h1>CLOTHES</h1>
                        <h1>CONTACT</h1>
                        <h1>ABOUT US</h1>

                    </div>


                </div>
                
            </div>
        )
    }