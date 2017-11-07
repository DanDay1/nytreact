// Contains main-container div that holds main layout and navigation. 
// This component should also be able to hold sub-components Search and Saved.

// Include React
var React = require("react");

// Include all sub-components
var Query = require("./Query.jsx");
var Search = require("./Search.jsx");
var Saved = require("./Saved.jsx");

// Require helper for making API calls
var helpers = require("../utils/helpers.js");

// Create Main Component
var Main = React.createClass({

  // Set generic state
  getInitialState: function() {
    return {
      apiResults: [],
      mongoResults: [],
      searchTerms: ["","",""]
    };
  },

  // These functions allow children to update the parent
  _setSearchFeilds: function(topic, start, end) {
    this.setState({ searchTerms: [topic, start, end] });
  },

  // Allow child to update Mongo data array
  _resetMongoResults: function(newData){
    this.setState({ mongoResults: newData} );
  },

  // After the Main renders, collect the saved articles from API endpoint
  componentDidMount: function() {

    // Hit Mongo API to get saved articles
    helpers.apiGet().then(function(query){
      this.setState({mongoResults: query.data});
    }.bind(this));
  },


  // If component changes (i.e. if a search is entered)
  componentDidUpdate: function(prevProps, prevState) {

    // Only hit API once (i.e. if prev state does not equal current)
    if(this.state.searchTerms != prevState.searchTerms){
      // Run the query for the address
      helpers.articleQuery(this.state.searchTerms[0], this.state.searchTerms[1], this.state.searchTerms[2]).then(function(data) {
        
        this.setState({ apiResults: data });
      }.bind(this));
    }

  },


  // Render the function
  render: function() {
    return (

      <div className="container" style={ {backgroundColor: "white", borderStyle: "solid", borderWidth: "1px"} }>

        <div className="page-header">
          <h1 className="text-center"><img style={ {width: "70%"} } src="img/timesmachine.png" alt="Times Machine"/></h1>
          <h2 className="text-center" style={ {marginTop: "-12px"} }><b><i>The Unoficial New York Times Archive Search</i></b></h2>
          <h4 className="text-center">Select any topic to search, as well as years to look in the archives.</h4>
        </div>

        <Query _setSearchFeilds={this._setSearchFeilds} />
        <Search apiResults={this.state.apiResults} _resetMongoResults={this._resetMongoResults} />
        <Saved mongoResults={this.state.mongoResults} _resetMongoResults={this._resetMongoResults} />

      </div>

    );
  }
});

// Export component back for use in other files
module.exports = Main;
