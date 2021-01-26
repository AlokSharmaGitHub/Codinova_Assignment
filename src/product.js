import React from "react";
import { Row, Col, Card, Container, Table, Button, Modal, } from "react-bootstrap";
import Productdata from "./pos.products.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
<i class="fas fa-times-circle"></i>

export default class Product extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            selectedProducts: [],
            show: false,
            date: "",
            time: "",
            srN: null,
            subTotal: 0,
            productCount: 0,
            vatTax: 0,
            totalVat: 0,
            Discount: 0,
            totalDiscount: 0,
            totalAmount: 0


        }
    }

    componentDidMount() {
        debugger;
        this.setState({ products: Productdata });
        var currentdate = new Date();
        var day = currentdate.getDate();
        var month = currentdate.getMonth() + 1;
        var year = currentdate.getFullYear();
        var hour = currentdate.getHours();
        var minute = currentdate.getMinutes();
        var second = currentdate.getSeconds();
        this.setState({ date: day + "-" + month + "-" + year });
        this.setState({ time: hour + ":" + minute + ":" + second });
    }



    selectProduct(data) {
        debugger;
        if (this.state.selectedProducts.length != 0) {
            var obj = this.state.selectedProducts.filter(x => x.name == data.name)[0];
            if (obj) {
                data.count = data.count + 1;
            } else {
                this.state.selectedProducts.push(data);
            }
            this.setState({ selectedProducts: this.state.selectedProducts });

        } else {
            this.state.selectedProducts.push(data);
            this.setState({ selectedProducts: this.state.selectedProducts });
        }
        this.subTotal();
    }

    subTotal() {
        debugger;
        let subTotalValue = 0;
        let productCountValue = 0;
        let total = 0;
        for (var y = 0; y < this.state.selectedProducts.length; y++) {
            subTotalValue = (subTotalValue + parseInt(this.state.selectedProducts[y].price)) * parseInt(this.state.selectedProducts[y].count);
            productCountValue = productCountValue + parseInt(this.state.selectedProducts[y].count);
        }
        this.setState({ subTotal: subTotalValue });
        this.setState({ productCount: productCountValue });

        total = subTotalValue + this.state.totalVat + this.state.totalDiscount;

        this.setState({ totalAmount: total.toFixed(1) });

    }

    incrementProduct(data) {
        debugger;
        if (this.state.selectedProducts.length != 0) {
            var obj = this.state.selectedProducts.filter(x => x.name == data.name)[0];
            if (obj) {
                data.count = data.count + 1;
            } else {
                this.state.selectedProducts.push(data);
            }

            this.setState({ selectedProducts: this.state.selectedProducts });

        } else {
            this.state.selectedProducts.push(data);
            this.setState({ selectedProducts: this.state.selectedProducts });
        }
        
        this.subTotal();
    }

    decrementProduct(data) {
        debugger;
        if (this.state.selectedProducts.length != 0) {
            var obj = this.state.selectedProducts.filter(x => x.name == data.name)[0];
            if (obj) {
                data.count = data.count - 1;
            } else {
                this.state.selectedProducts.push(data);
            }
            this.state.selectedProducts = this.state.selectedProducts.filter(e => e.count !== 0);
            this.setState({ selectedProducts: this.state.selectedProducts });

        } else {
            this.state.selectedProducts.push(data);
            this.setState({ selectedProducts: this.state.selectedProducts });
        }
        this.subTotal();
    }

    removeProduct(data) {
        debugger;
        data.count = 1;

        this.state.selectedProducts = this.state.selectedProducts.filter(e => e.name !== data.name);

        this.setState({ selectedProducts: this.state.selectedProducts });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        debugger;
        this.setState({ show: false });
    }

    reset() {
        this.setState({ selectedProducts: [] });
    }

    vatTax(e) {
        debugger;
        this.setState({ vatTax: e.target.value });
        let vatTaxCal = (this.state.subTotal / 100) * parseInt(e.target.value);
        this.setState({ totalVat: vatTaxCal.toFixed(1) });
        let total = 0;
        total = vatTaxCal + this.state.subTotal + this.state.totalDiscount;

        this.setState({ totalAmount: parseInt(total.toFixed(1)) });



    }

    discount(e) {
        debugger;
        this.setState({ Discount: e.target.value });
        let discountCal = ((this.state.subTotal + parseInt(this.state.totalVat)) / 100) * parseInt(e.target.value);
        this.setState({ totalDiscount: discountCal.toFixed(1) });
        let total = 0;
        total = (this.state.subTotal + parseInt(this.state.totalVat)) - discountCal;

        this.setState({ totalAmount: total.toFixed(1) });
    }

    checkPercentageVat() {
        debugger;
        if (!this.state.vatTax.includes("%")) {
            alert("Please enter the tax value with %");
        }

    }

    checkPercentageDis() {
        if (!this.state.Discount.includes("%")) {
            alert("Please enter the discount value with %");
        }
    }




    render() {


        return (
            <>
                <Row>
                    <Col sm={5}>
                        <Row className="container coloumCss">
                            <div className="col-md-12 reset_book_div">
                                <h4>Selected Products</h4>


                                <Table className="tableMargin">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Products</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>

                                    {
                                        this.state.selectedProducts.length > 0 ?
                                            this.state.selectedProducts.map((item) =>

                                                <tbody>
                                                    <tr>
                                                        <td><FontAwesomeIcon className="removeItem cursor" icon={faTimesCircle} onClick={() => this.removeProduct(item)} /></td>
                                                        <td>{item.name}</td>
                                                        <td>{item.price}</td>
                                                        <td>
                                                            <FontAwesomeIcon className="minus_plus_icons cursor" icon={faMinusSquare} onClick={() => this.decrementProduct(item)} />
                                                            {item.count}
                                                            <FontAwesomeIcon className="minus_plus_icons cursor" icon={faPlusSquare} onClick={() => this.incrementProduct(item)} />
                                                        </td>

                                                        <td>{item.price * item.count} INR</td>
                                                    </tr>
                                                </tbody>
                                            )
                                            :
                                            <tbody>
                                                <tr>
                                                    <td colSpan={5}><h2 className="emptyProducts">THERE ARE NO PRODUCTS!!!</h2></td>
                                                </tr>
                                            </tbody>
                                    }
                                </Table>
                                <div className="row reset_book_button">
                                    <div className="col-md-12">
                                        <Table striped bordered hover size="sm">

                                            <tbody>
                                                <tr className="trAlign">
                                                    <td><strong>SubTotal</strong></td>
                                                    <td className="trCss">{this.state.subTotal} INR</td>
                                                    <td className="trCss ndTrAlign"><strong>{this.state.productCount} items</strong></td>
                                                </tr>
                                                <tr className="trAlign">
                                                    <td><strong>VAT tax</strong></td>
                                                    <td className="trCss"><input className="vat" type="text" onChange={(e) => this.vatTax(e)} onBlur={() => this.checkPercentageVat()} /></td>
                                                    <td className="trCss ndTrAlign"><strong>{this.state.totalVat} INR</strong></td>
                                                </tr>
                                                <tr className="trAlign">
                                                    <td><strong>Discount</strong></td>
                                                    <td className="trCss"><input className="vat" type="text" onChange={(e) => this.discount(e)} onBlur={() => this.checkPercentageDis()} /></td>
                                                    <td className="trCss ndTrAlign"><strong>{this.state.totalDiscount} INR</strong></td>
                                                </tr>
                                                <tr className="trAlign">
                                                    <td><strong>Total</strong></td>
                                                    <td className="trCss"><strong>{this.state.totalAmount} INR</strong></td>
                                                    <td className="trCss ndTrAlign"></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="col-md-6">
                                        <Button className="btn_width" variant="danger" onClick={() => this.reset()}>CANCEL SALE</Button>
                                    </div>
                                    <div className="col-md-6">
                                        <Button className="btn_width" variant="success" onClick={() => this.handleShow()}>PROCESS SALE</Button>
                                    </div>
                                </div>

                            </div>



                        </Row>

                    </Col>
                    <Col sm={7}>

                        <Row className="container coloumCss">
                            <div className="col-md-12">
                                <h4>Products</h4>
                            </div>
                            {
                                this.state.products.map((item, i) =>
                                    <div className="col-md-3">
                                        <Card className="example cursor">

                                            <Card.Body>
                                                <figure className="containerimg">

                                                    {
                                                        item.image == undefined ?
                                                            <span>There is no Poduct Image</span> :
                                                            <img className="container_image" src={"/images" + "/" + item.image} />
                                                    }
                                                </figure>
                                                <div className="content" onClick={() => this.selectProduct(item)}>
                                                    <div className="text"><strong>{item.name}</strong></div>
                                                    <div className="text"><strong>{item.price} EUR</strong></div>
                                                    <div className="text">{item.description}</div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            }
                        </Row>
                    </Col>

                    <Modal show={this.state.show} onHide={() => this.handleClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Receipt</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-md-12 modalCenter">
                                    <label className="headingSize"><strong>Sale No - 00102</strong></label><br />
                                    <label>Date : {this.state.date}  {this.state.time}</label>
                                </div>
                                <div className="col-md-12">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Products</th>
                                                <th>Quantity</th>
                                                <th>Sub Total</th>
                                            </tr>
                                        </thead>


                                        {

                                            this.state.selectedProducts.map((item, index) =>

                                                <tbody>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.count}</td>
                                                        <td>{item.price * item.count} INR</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        }

                                    </Table>
                                </div>
                                <div className="col-md-6">
                                    <label><strong>Total Item : </strong> {this.state.productCount}</label><br />
                                    <label><strong>Vat Tax : </strong> {this.state.vatTax}</label>
                                </div>
                                <div className="col-md-6">
                                    <label><strong>Total : </strong> {this.state.totalAmount} INR</label><br />
                                    <label><strong>Discount : </strong> {this.state.Discount}</label>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose()}>
                                Close
          </Button>
                        </Modal.Footer>
                    </Modal>

                </Row>


            </>

        )
    }
}