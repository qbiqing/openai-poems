import React from 'react';

class PromptForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '', length: 60, chaos: 0.6};
  
      this.handleChangePrompt = this.handleChangePrompt.bind(this);
      this.handleChangeMaxLength = this.handleChangeMaxLength.bind(this);
      this.handleChangeChaos = this.handleChangeChaos.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangePrompt(event) {
      this.setState({value: event.target.value});
    }

    handleChangeMaxLength(event) {
      this.setState({length: event.target.value});
    }

    handleChangeChaos(event) {
      this.setState({chaos: event.target.value});
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
            max_tokens: parseInt(this.state.length),
            temperature: parseFloat(this.state.chaos),
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.3,
            stop: ["###"]
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
              <input type="text" value={this.state.value} onChange={this.handleChangePrompt} />
              <br/>
              <br/>
            </label>
            <label>
              Max length of poem (optional): <br/>
              <input type="text" value={this.state.length} onChange={this.handleChangeMaxLength} />
              <br/>
            </label>
            <label>
              Adjust chaos from 0 to 1 (optional): <br/>
              <input type="text" value={this.state.chaos} onChange={this.handleChangeChaos} />
              <br/>
            </label>
            <br/>
            <input type="submit" value="Submit" />
          </form>
          <br/>
          <div className="poem">
            {this.state.data &&
              this.state.data.choices &&
              this.state.data.choices.length > 0 &&
              this.state.data.choices[0].text &&
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