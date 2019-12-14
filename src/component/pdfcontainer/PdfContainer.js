import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PdfContainer.css';

export default (props) => {
    const bodyRef = React.createRef();
    const createPdf = () => props.createPdf(bodyRef.current, props.filename);
    const printPdf = () => props.printPdf(bodyRef.current);
    setTimeout(function(){
        printPdf();
    }, 200);
    return (
        <section className="pdf-container">
            <section className="pdf-toolbar">
                {!props.isMobile &&
                    <div className="pdf-download">
                        <button onClick={createPdf}>{props.t('pdf_container.download')}<FontAwesomeIcon icon="download" /></button>
                    </div>
                }
                <div className="pdf-print">
                    <button onClick={printPdf}>{props.t('pdf_container.print')}<FontAwesomeIcon icon="print" /></button>
                </div>
            </section>
            <section className="pdf-body" ref={bodyRef}>
                {props.children}
            </section>
        </section>
    )
}