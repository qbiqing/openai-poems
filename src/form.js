import React from 'react';

class PromptForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer <INSERT YOUR API KEY>'
        },
        body: JSON.stringify({
            prompt: 'Poem about ' + this.state.value + ':\n',
            max_tokens: 60,
            temperature: 0.6,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.3,
            stop: ['###']
        })
      }).then(response => response.json())
        .then(data => this.setState({data: data}));

      event.preventDefault();
    }
  
    render() {
      return (
        <div className="form-and-poem">
          <form onSubmit={this.handleSubmit}>
            <label>
              Enter prompt of one or more words: <br/>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <br/>
          <div className="poem">
            {this.state.data &&
              <div>
                  {this.state.data.choices[0].text.split('\n').map((i,key) => {
                      return <div key={key}>{i}</div>;
                  })}
              </div>
            }
          </div>
        </div>
      );
    }
  }

  export default PromptForm;