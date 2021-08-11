import React from 'react'
import './footer.css';
export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                <a href="https://r-w-chen.github.io/" rel="noreferrer" target='_blank'>
                    <h1>Created by Becky Chen</h1>
                </a>
                <a href="https://github.com/r-w-chen/NimbusWaves" rel="noreferrer" target='_blank'>
                    <i className="fab fa-github fa-2x"/>
                </a>
                <a href="https://www.linkedin.com/in/rwchen/" rel="noreferrer" target='_blank'>
                    <i className="fab fa-linkedin fa-2x"/>
                </a>
                <a href="mailto:rebeccawchen@gmail.com">
                    <i className="fas fa-envelope fa-2x"/>
                </a>
            </div>
        </div>
    )
}
