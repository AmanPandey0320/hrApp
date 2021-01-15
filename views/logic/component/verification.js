class ApplicationView extends React.Component {
  state;
  viewBtnClickListener=()=>{

  };
  acceptClickListener=()=>{
    var data = this.state;
    var sender = JSON.stringify(data);
    console.log('acceptClickListener');
    var url ='http://localhost:5560/company/api/company/accept';
    $.ajax({
      type: 'POST',
      url: url,
      data:sender,
      dataType: 'json',
      contentType:'application/json',
      success:(response)=>{
        DomSetter();
      }
    });
  };
  declineClickListener=()=>{};
  render() {
    this.state = this.props.data;
    return (
    <div>
      <div className="my-1 application-div">
        <img src={this.props.data.image} width="100%"></img>
      </div>
      <div className="ml-1 application-text-div"><lable> <i className="fa fa-user-tie mr-1 "></i>Name: </lable><span>{this.props.data.empname}</span></div>
      <div className="ml-1 application-text-div"><lable><i className="far fa-id-badge mr-1"></i>ID No: </lable><span>{this.props.data.employeeID}</span></div>
      <div className="ml-1 application-text-div"><lable><i className="far fa-building mr-1"></i>Department: </lable><span>{this.props.data.department}</span></div>
      <div className="ml-1 application-text-div"><lable><i className="fas fa-briefcase mr-1"></i>Position: </lable><span>{this.props.data.position}</span></div>
      <div className="ml-1 application-text-div"><lable><i className="fas fa-at mr-1"></i>Email-ID: </lable><span>{this.props.data.employeeEmail}</span></div>
      <div className="ml-1 application-text-div"><lable><i className="fas fa-phone-square-alt mr-1"></i>Conatct: </lable><span>{this.props.data.EmPhone}</span></div>
      <div className="ml-1 application-text-div"><lable><i className="fas fa-tag mr-1"></i>Role: </lable><span>{this.props.data.employmentType}</span></div>
      <div className="ml-1 application-text-div"><lable><i className="fas fa-venus-mars"></i>Gender: </lable><span>{this.props.data.gender}</span></div>
      <div className="ml-1 application-text-div"><lable><i className="fas fa-location-arrow"></i>Address: </lable><span>{`${this.props.data.address[0]}, ${this.props.data.address[1]}, ${this.props.data.address[2]}`}</span></div>
      <div className="mx-0 container my-application-btn-div">
        <button id="view-application" className="my-btn btn btn-outline-primary btn-sm" ><span>View</span><i className="fas fa-chevron-right ml-1"></i></button>
        <button id="accept-application" onClick={this.acceptClickListener} className="my-btn btn btn-outline-success btn-sm" >Accept</button>
        <button id="decline-application"  className="my-btn btn btn-outline-danger btn-sm" >Decline</button></div>
      
    </div>
    );
  }
}

class SingleItem extends React.Component {
  state;
  handleClick(name){
    ReactDOM.render(<ApplicationView data={name}/>, document.getElementById('application-view'));
  };
  showProfile = ()=>{
    this.handleClick(this.state);
  }
    render() {
      this.state=this.props.info;
      return (
        <div className="row my-single-item mx-1 my-1">
          <div className="img-div">
            <img className="img" src={this.props.info.image}></img>
          </div>
          <div className="my-text-div ml-2 col">
            <div className="row">{this.props.info.empname}</div>
            <div className="row"><small>{this.props.info.employeeID}</small></div>
            <div className="row"><small>{this.props.info.department}</small></div>
            <button className="btn btn-sm ml-4 text-primary" onClick={this.showProfile}>view</button>
          </div>
        </div>
      );
    }
  }

class List extends React.Component {
  render() {
    var list = this.props.data;
    return(
      list.map(e=><SingleItem info={e} />)
    );
  }
}
var DomSetter = ()=>{
  // alert('got');
  var eid = sessionStorage.getItem('manageHrSessionUID');
// console.log(eid);
var url = `http://localhost:5560/employee/api/employee/verification?uid=${eid}`
$.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    success: (response) =>{
        // console.log(response.result);
        if(response.result.length > 0){
          ReactDOM.render(<List data={response.result} />, document.getElementById('verification-list'));
          ReactDOM.render(<ApplicationView data={response.result[0]}/>, document.getElementById('application-view'));
        }else{
          ReactDOM.render(<h1 className="text-muted text-center">No verification requests</h1>, document.getElementById('application-view'));
          ReactDOM.render(<h5 className="text-muted text-center">No verification requests</h5>, document.getElementById('verification-list'));
        }

    }
});
}

DomSetter();
