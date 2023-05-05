from flask import Flask, jsonify,request
import firebase_admin
import pyrebase
import json
from functools import reduce
from firebase_admin import credentials, db, auth
from flask_cors import CORS
from werkzeug.security import check_password_hash

# Initialize Flask app
app = Flask(__name__)
CORS(app)
# Initialize Firebase SDK
cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://e-mart-8ef8d-default-rtdb.firebaseio.com/'
})

firebaseConfig = {
                "apiKey": "AIzaSyAlacHoOz-iLwrtAO6jUl0CRewQxsBlTCk",
                "authDomain": "e-mart-8ef8d.firebaseapp.com",
                "databaseURL": "https://e-mart-8ef8d-default-rtdb.firebaseio.com",
                "projectId": "e-mart-8ef8d",
                "storageBucket": "e-mart-8ef8d.appspot.com",
                "messagingSenderId": "223554983553",
                "appId": "1:223554983553:web:d3bfa3f63d210c24a49f80",
                "measurementId": "G-B3G95BQR9K"
}

firebase = pyrebase.initialize_app(firebaseConfig)
client_auth = firebase.auth()



class ProductManagement:
    ref,productList,categoryList = None,None,None
    
    def getFeaturedProducts(self):
        self.ref = db.reference('FeaturedProduct')
        my_dict = self.ref.get()
        self.productList = list(map(lambda productCode: db.reference('Product/{}'.format(productCode)).get(),my_dict.values()))
        return self.productList
    
    def getAllCategories(self):
        self.ref = db.reference('Category')
        my_dict = self.ref.get()
        self.categoryList = my_dict
        return self.categoryList
    
    def getProduct(self,productCode):
        self.ref = db.reference('Product/{}'.format(productCode))
        return self.ref.get()
    
    def getCategoryProductList(self,category):
        self.ref = db.reference('Product')
        my_dict = self.ref.get()
        category = category.lower()
        index = category.find("all")
        if(index==-1):
            self.productList = dict(filter(lambda key: key[1]['category'].lower() == category,my_dict.items()))
        else:
            self.productList = my_dict    
        return self.productList
    
    def searchProduct(self,searchValue):
        self.ref = db.reference('Product')
        my_dict = self.ref.get()
        searchValue = searchValue.lower()
        self.productList = dict(filter(lambda items: 
            (searchValue in items[1]['title'].lower()) or (searchValue in items[1]['brand'].lower()),my_dict.items()))
        return self.productList
    
    def sortProductList(self,sort):
        print(dict(sorted(self.productList.items(),key = lambda item : item[1]['price'])))
        return  dict(sorted(self.productList.items(),key = lambda item : item[1]['price']))
    
    def filterProductList(self,category,searchValue,priceRange):
        self.ref = db.reference('Product')
        my_dict = self.ref.get()
        searchValue = searchValue.lower()
        category=category.lower()
        if category == "search":
            self.productList = dict(filter(lambda items: 
            (searchValue in items[1]['title'].lower()) or (searchValue in items[1]['brand'].lower()),my_dict.items()))
            self.productList = dict(filter(lambda items : items[1]['price']<= int(priceRange),self.productList.items()))
        else:
            index = category.find("all")
            if(index == -1):
                self.productList = dict(filter(lambda key: key[1]['category'] == category,my_dict.items()))
                self.productList = dict(filter(lambda items : items[1]['price']<= int(priceRange),self.productList.items()))    
            else:
                self.productList = my_dict
                self.productList = dict(filter(lambda items : items[1]['price']<= int(priceRange),self.productList.items()))
                
        return self.productList
    

class OrderManagement:
    ref,orderList,orderItemsList = None,None,None
    
    def addToCart(self,orderId,productCode,title,image,price,quantity):
        self.ref = db.reference('OrderItem/{}/{}'.format(orderId,productCode))
        orderItem = self.ref.get()
        if orderItem is None:
            orderItem = self.ref.set({
            "title":title,
            "image":image,
            "price":price,
            "quantity":int(quantity)
            })
        else:
            currentQuantity = int(orderItem['quantity'])
            newQuantity = currentQuantity + int(quantity)
            self.ref.update({"quantity":newQuantity})
            
        return "Data has been loaded successfully"
    
    def getCartItems(self,orderId):
        self.ref = db.reference('OrderItem/{}'.format(orderId))
        self.orderItemsList = self.ref.get()
        if self.orderItemsList is None:
            return {}
        else:
            return self.orderItemsList
        
    def removeCartItem(self,orderId,productCode):
        self.ref = db.reference('OrderItem/{}/{}'.format(orderId,productCode))
        self.ref.delete()
        print("Deleted Successfully")
        return self.getCartItems(orderId)
    
    def calculateBill(self,orderId):
        self.ref = db.reference('OrderItem/{}'.format(orderId))
        my_dict = self.ref.get()
        return str(reduce(lambda accumulator,currentValue : accumulator + currentValue['price'] * currentValue['quantity'] ,my_dict.values(),0))
    
    def confirmOrder(self,orderId,customerId,status,totalPrice,date,deliveryType):
        self.ref = db.reference('Order/{}'.format(orderId))
        self.ref.set({
            "orderId":orderId,
            "customerId":customerId,
            "status":status,
            "totalPrice":totalPrice,
            "date":date,
            "deliveryType":deliveryType
        })
        return "Order confirmed Successfully"

        

class CustomerManagement:
    ref = None
    def getCustomer(self,customerId):
        self.ref = db.reference('Customer/{}'.format(customerId))
        my_dict = self.ref.get()
        return my_dict
    
    def register(self,customer):
        try:
            print("Hello")
            newCustomer = auth.create_user(
                email=customer['email'],
                password=customer['password']
            )
            print(newCustomer.uid)
            self.ref = db.reference('Customer/{}'.format(newCustomer.uid))
            self.ref.set({
                "uid":newCustomer.uid,
                "name":customer['name'],
                "address":customer['address'],
                "phone":customer['phone'],
                "email":customer['email']
            })
            return {
                "uid":newCustomer.uid,
                "name":customer['name'],
                "address":customer['address'],
                "phone":customer['phone'],
                "email":customer['email']
            }
        except Exception as e:
            return {"error": str(e)}, 500
    
    
    def updateProfile(self,customer):
        try:
            self.ref = db.reference('Customer/{}'.format(customer['uid']))
            self.ref.update({
                "name":customer['name'],
                "address":customer['address'],
                "phone":customer['phone']
            })
            return "Profile Updated Successfully"
        except Exception as e:
            return {"error":str(e)},500
        
    def updatePassword(self,email,currentPassword,newPassword):
        try:
            client_auth.sign_in_with_email_and_password(email,currentPassword)
            try:
                customer = auth.get_user_by_email(email)
                auth.update_user(customer.uid,password=newPassword)
                return "Password Updated Successfully"
            except Exception as e:
                print(type(e).__name__)
                print(str(e))
                return {"error":"Couldn't update your password. Please try again"},500
        except Exception as e:
            return {"error":"Invalid current password"},500
    
    def login(self,email,password):
        try:
            try:
                auth.get_user_by_email(email)
            except Exception as e:
                return {"error":"Email address not valid"},500
            
            newCustomer =  client_auth.sign_in_with_email_and_password(email,password)
            customerDetails = db.reference('Customer/{}'.format(newCustomer['localId'])).get()
            return customerDetails
        
        except Exception as e:
            return {"error":"Incorrect Password"},500
    
    
    def getOrderList(self,customerId):
        try:
            self.ref = db.reference('Order')
            my_dict = self.ref.get()
            orderList = dict(filter(lambda x: x[1]['customerId']==customerId,my_dict.items()))
            orderItemList = dict(map(lambda orderId : (orderId,db.reference('OrderItem/{}'.format(orderId)).get() ),orderList.keys()))
            new_dict = {orderId: (orderList[orderId], orderItemList[orderId]) for orderId in orderList.keys() & orderItemList.keys()}
            return new_dict
        except Exception as e:
            print(type(e).__name__)
            print(str(e))
            return {"error":"Couldn't get order list"},500
        
    def forgetPassword(self,email):
        try:
            client_auth.send_password_reset_email(email)
            return "A password reset link has been sent to your email."
        except Exception as e:
            return {"error":"Email not found"},500    
        


class ReviewManagement:
    ref,reviewList = None,None
    
    def postReview(self,productCode,customerId,reviewId,comment,date,):
        try:    
            self.ref = db.reference('Customer/{}'.format(customerId))
            newCustomer = self.ref.get()
            try:
                self.ref = db.reference('Product/{}/Review/{}'.format(productCode,reviewId))
                self.ref.update({
                    "comment":comment,
                    "customerName":newCustomer['name'],
                    "date":date
                })
                return "Your review has been posted successfully"
            except Exception as e:
                print(str(e))
                return {"error":"Couldn't post your review . Please try again"},500    
        except Exception as e:
            print(str(e))
            return {"error":"Couldn't identify customer. Please try again"},500

productManager = ProductManagement()


# Define a route that retrieves data from the Firebase database
@app.route('/')
def index():
    pass




@app.route('/getAllCategories',methods=['GET'])
def getAllCategories():
    return productManager.getAllCategories()

@app.route('/getFeaturedProducts',methods=['GET'])
def getFeaturedProducts():
    return productManager.getFeaturedProducts()
    
@app.route('/getProductInfo',methods=['GET'])
def getProductInfo():
    return productManager.getProduct(request.args.get('productCode'))

@app.route('/getCategoryProductList',methods=['GET'])
def getProductList():
    return productManager.getCategoryProductList(request.args.get('category'))

@app.route('/searchProduct',methods=['GET'])
def searchProduct():
    return productManager.searchProduct(request.args.get('searchValue'))


@app.route('/getSortedList',methods=['GET'])
def sortProductList():
    return productManager.sortProductList(request.args.get('sort'))

@app.route('/filterProductList',methods=['GET'])
def getFilteredList():
    return productManager.filterProductList(request.args.get('category'),request.args.get('searchValue'),request.args.get('priceRange'))

@app.route('/addToCart',methods=['POST'])
def addToCart():
    data = request.json
    return OrderManagement().addToCart(data['orderId'],data['productCode'],data['title'],data['image'],data['price'],data['quantity'])

@app.route('/getCartItems',methods=['GET'])
def getCartItems():
    return OrderManagement().getCartItems(request.args.get('orderId'))

@app.route('/removeCartItem',methods=['DELETE'])
def removeCartItem():
    print("OrderId = {} +  productCode =  {}".format(request.args.get('orderId'),request.args.get('productCode')))
    return OrderManagement().removeCartItem(request.args.get('orderId'),request.args.get('productCode'))


@app.route('/calculateBill',methods=['GET'])
def calculateBill():
    return OrderManagement().calculateBill(request.args.get('orderId'))

@app.route('/confirmOrder',methods=['POST'])
def confirmOrder():
    data = request.json
    return OrderManagement().confirmOrder(data['orderId'],data['customerId'],data['status'],data['totalPrice'],data['date'],data['deliveryType'])

@app.route('/registerCustomer',methods=['POST'])
def registerCustomer():
    data = request.json
    return CustomerManagement().register(data)

@app.route('/loginCustomer',methods=['POST'])
def loginCustomer():
    data = request.json
    print(data)
    return CustomerManagement().login(data['email'],data['password'])

@app.route('/forgetPassword',methods=['POST'])
def forgetPassword():
    data = request.json
    return CustomerManagement().forgetPassword(data['email'])

@app.route('/getCustomer',methods=['GET'])
def getCustomer():
    return CustomerManagement().getCustomer(request.args.get('customerId'))

@app.route('/updateProfile',methods=['PUT'])
def updateProfile():
    data = request.json
    return CustomerManagement().updateProfile(data)

@app.route('/updatePassword',methods=['PUT'])
def updatePassword():
    data = request.json
    return CustomerManagement().updatePassword(data['email'],data['currentPassword'],data['newPassword'])

@app.route('/getOrderList',methods=['GET'])
def getOrderList():
    return CustomerManagement().getOrderList(request.args.get('customerId'))


@app.route('/postReview',methods=['POST'])
def postReview():
    data = request.json
    return ReviewManagement().postReview(data['productCode'],data['customerId'],data['reviewId'],data['comment'],data['date'])

if __name__ == '__main__':
    app.run(debug=True)
