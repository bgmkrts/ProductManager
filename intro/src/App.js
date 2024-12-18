import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";


export default class App extends Component {

  
  state = { currentCategory: "", products: [],cart:[] };

  componentDidMount() {
    this.getProducts();
  }

  chanceCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    console.log(category);
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "  http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  addToCart=(product)=>{
    let newCart=this.state.cart;
    var addedItem=newCart.find(c=>c.product.id===product.id)
    if(addedItem){
      addedItem.quantity+=1;
    }
    else{
      newCart.push({product:product,quantity:1});

    }
    this.setState({cart:newCart});


  }
  
  render() {
    // let titleProduct="Product List"
    // let titleCategory="Category List"
    //encapsulation
    let productInfo = { title: "ProductList", baskaBisey: "baskabisey" };
    let categoryInfo = { title: "CategoryList" };
    return (
      <div>
        <Container>
          <Navi cart={this.state.cart}></Navi>

          <Row>
            <Col xs="3">
              {/* <CategoryList title={titleCategory}></CategoryList> */}
              <CategoryList
                currentCategory={this.state.currentCategory}
                chanceCategory={this.chanceCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              {/* <ProductList title={titleProduct}></ProductList>  */}
              <ProductList
                products={this.state.products}
                addToCart={this.addToCart}
                currentCategory={this.state.currentCategory}
                info={productInfo}
              ></ProductList>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
