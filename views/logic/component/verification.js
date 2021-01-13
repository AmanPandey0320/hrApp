class ApplicationView extends React.Component {
  render() {
    return (
        <h1>{this.props.name}</h1>
    );
  }
}

class SingleItem extends React.Component {
  state;
  handleClick(name){
    ReactDOM.render(<ApplicationView name={name}/>, document.getElementById('application-view'));
  };
  showProfile = ()=>{
    this.handleClick(this.state.employeeID);
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
var eid = sessionStorage.getItem('manageHrSessionUID');
// console.log(eid);
var url = `http://localhost:5560/employee/api/employee/verification?uid=${eid}`
$.ajax({
    type: "POST",
    url: url,
    dataType: "json",
    success: (response) =>{
        // console.log(response.result);
        ReactDOM.render(<List data={response.result} />, document.getElementById('verification-list'))
    }
});