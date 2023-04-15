import './Footer.css'

const Footer = ()=>{
    return(
        <div className="footer">
            <div className='footer-heading'>
                <h1>Stay Connected With Us</h1>
                <div className="footer-socials">
                    <i class="fa-brands fa-facebook fa-2xl"></i>
                    <i class="fa-brands fa-instagram fa-2xl"></i>
                    <i class="fa-solid fa-envelope fa-2xl"></i>
                </div>
            </div>
            <div className='footer-options'>
                <div className='footer-section'>
                    <h6>What we offer</h6>
                    <p>Services</p>
                    <p>Events</p>
                    <p>Opportunities</p>
                </div>
                <div className='footer-section'>
                    <h6>Advertise with us</h6>
                    <p>Business</p>
                    <p>Personal</p>
                </div>
                <div className='footer-section'>
                    <h6>PGBazaar</h6>
                    <p>Products</p>
                    <p>Services</p>
                    <p>Promotions</p>
                </div>
            </div>
        </div>
    );
}

export default Footer