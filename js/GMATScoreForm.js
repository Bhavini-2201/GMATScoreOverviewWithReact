class GMATScoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueCurrentQuant: '',
      valueTargetQuant: '',
      valueCurrentVerbal: '',
      valueTargetVerbal: '',
      bShowCharts: false,
      targetTotalScore: 0,
      currTotalScore: 0
      // diffTotalScore: 0,
      // diffQuantScore: 0,
      // diffVerbaScore: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  render() {
    return (
      <div>
        <div className="splitRow">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="column">
              <br></br>
              <h3 className="headingId">Quant</h3>
              <label className="lblId">
                Current
          <input className="quantCurrId" name={'valueCurrentQuant'} type="text" maxLength="2" value={this.state.value} onChange={this.handleChange} />
              </label>
              <label className="lblId">
                Target
          <input className="quantTarId" name={'valueTargetQuant'} type="text" maxLength="2" value={this.state.value} onChange={this.handleChange} />
              </label>
            </div>
            <div className="column1">
              {/* <form onSubmit={this.handleSubmit}> */}
              <br></br>
              <h3 className="headingId">Verbal</h3>
              <label className="lblId">
                Current
          <input className="verbalCurrId" name={'valueCurrentVerbal'} type="text" maxLength="2" value={this.state.value} onChange={this.handleChange} />
              </label>
              <label className="lblId">
                Target
          <input className="verbalTarId" name={'valueTargetVerbal'} type="text" maxLength="2" value={this.state.value} onChange={this.handleChange} />
              </label>
            </div>
            <br></br>
            <input className="button" type="submit" value="Submit and Refresh" />
          </form>
        </div>
        <div>
          <BarGraphView showCharts={this.state.bShowCharts} params={this.state} />
          <br></br>
        </div>
      </div>
    );
  }

  handleChange(event) {
    if (!isNaN(event.target.value) && parseInt(event.target.value) >= 1 && parseInt(event.target.value) <= 60) {
      this.setState({
        [event.target.name]: parseInt(event.target.value)
      });
      document.getElementsByClassName("button")[0].disabled = false;
    } else {
      event.preventDefault();
      document.getElementsByClassName("button")[0].disabled = true;
    }
  }


  handleSubmit(event) {
    this.setState({
      bShowCharts: true,
      currTotalScore: 200 + (parseInt(this.state.valueCurrentQuant) + parseInt(this.state.valueCurrentVerbal)) * 5,
      targetTotalScore: (parseInt(this.state.valueTargetQuant) + parseInt(this.state.valueTargetVerbal)) * 5 + 200
    });
    event.preventDefault();
    document.getElementsByClassName("quantCurrId")[0].value = "";
    document.getElementsByClassName("quantTarId")[0].value = "";
    document.getElementsByClassName("verbalCurrId")[0].value = "";
    document.getElementsByClassName("verbalTarId")[0].value = "";
  }
}

function BarGraphView(props) {
  const totalScore = 800;
  let diffTotalScore = 0, diffQuantScore = 0, diffVerbalScore = 0;
  const targetTotalScore = props.params.targetTotalScore;
  const currTotalScore = props.params.currTotalScore;
  const valueTargetVerbal = props.params.valueTargetVerbal;
  const valueCurrentVerbal = props.params.valueCurrentVerbal;
  const valueTargetQuant = props.params.valueTargetQuant;
  const valueCurrentQuant = props.params.valueCurrentQuant;
  if (!props.showCharts) {
    return null;
  }

  if (targetTotalScore >= currTotalScore) {
    diffTotalScore = targetTotalScore - currTotalScore;
  } else {
    diffTotalScore = currTotalScore - targetTotalScore;
  }

  if (valueTargetQuant >= valueCurrentQuant) {
    diffQuantScore = valueTargetQuant - valueCurrentQuant;
  } else {
    diffQuantScore = valueCurrentQuant - valueTargetQuant;
  }

  if (valueTargetVerbal >= valueCurrentVerbal) {
    diffVerbalScore = valueTargetVerbal - valueCurrentVerbal;
  } else {
    diffVerbalScore = valueCurrentVerbal - valueTargetVerbal;
  }

  return (
    <div>
      {/* code for total score of GMAT */}
      <div className="mainChart">
        <br></br>
        {/* Text over the indicator for score */}
        {(diffTotalScore > 15) && <div style={{marginTop: "-20px"}}><h3 className="headingIdForTotalChart">Total Score <br></br>{props.params.currTotalScore}</h3><div className="textForPITar" style={{ marginLeft: (targetTotalScore + 140) + "px" }}>{targetTotalScore}</div>
          <div className="textForPICurr" style={{ marginLeft: (currTotalScore + 140) + "px" }}>{currTotalScore}</div></div>
        }{(diffTotalScore > 0 && diffTotalScore <= 15) && <div style={{marginTop: "-20px"}}><h3 className="headingIdForTotalChart1">Total Score <br></br>{props.params.currTotalScore}</h3><div className="textForPITar1" style={{ marginLeft: (targetTotalScore + 140) + "px" }}>{targetTotalScore}</div>
          <div className="textForPICurr" style={{ marginLeft: (currTotalScore + 140) + "px" }}>{currTotalScore}</div></div>
        }{(diffTotalScore == 0) && <div style={{marginTop: "-20px"}}><h3 className="headingIdForTotalChart">Total Score <br></br>{props.params.currTotalScore}</h3>
          <div className="textForPICurr" style={{ marginLeft: (currTotalScore + 140) + "px" }}>{currTotalScore}</div></div>
        }
        {/* displaying bar chart based on different scores  */}
        {(targetTotalScore > currTotalScore) && <div className="barChartForTotal">
          <div className="forTargetTotal" style={{ width: targetTotalScore + "px" }}>
            {/* Indicator at top and botton depending upon the difference in score */}
            {(targetTotalScore > currTotalScore + 15) &&
              <div style={{
                position: 'absolute', content: "", height: "10px", background: "#f0f0f0",
                top: "-15px", left: targetTotalScore - 5 + "px", borderLeft: "3px solid #f0f0f0", borderRight: "3px solid #f0f0f0", borderTop: "10px solid #ffe28a"
              }}></div>

            }{(targetTotalScore <= currTotalScore + 15) && <div style={{
              position: 'absolute', content: "", height: "10px", background: "#f0f0f0",
              bottom: "-15px", transform: "rotate(180deg)", left: targetTotalScore - 5 + "px", borderLeft: "3px solid #f0f0f0", borderRight: "3px solid #f0f0f0", borderTop: "10px solid #ffe28a"
            }}></div>}

            <div className="forCurrentTotal" style={{ width: currTotalScore + "px" }}>
              <div style={{
                position: 'absolute', content: "", height: "10px", background: "#f0f0f0",
                top: "-15px", left: currTotalScore - 5 + "px", borderLeft: "3px solid #f0f0f0", borderRight: "3px solid #f0f0f0", borderTop: "10px solid #0fa2eb"
              }} />
              <p className="textForTotalDiff" style={{ margin: "0px" + " " + " " + (currTotalScore + (diffTotalScore / 2) + 10) + "px" }}> +{diffTotalScore} </p>
            </div>
          </div>
        </div>
        }{(targetTotalScore <= currTotalScore) && <div className="barChartForTotal">
          <div className="forTargetTotal" style={{ width: targetTotalScore + "px" }}>
            {/* Indicator at top and botton depending upon the difference in score */}
            {(currTotalScore > targetTotalScore + 15) && <div style={{
              position: 'absolute', content: "", height: "10px", background: "#f0f0f0",
              top: "-15px", left: targetTotalScore - 5 + "px", borderLeft: "3px solid #f0f0f0", borderRight: "3px solid #f0f0f0", borderTop: "10px solid #ffe28a"
            }} />
            }{
              (currTotalScore <= targetTotalScore + 15) && <div style={{
                position: 'absolute', content: "", height: "10px", background: "#f0f0f0",
                bottom: "-15px", transform: "rotate(180deg)", left: targetTotalScore - 5 + "px", borderLeft: "3px solid #f0f0f0", borderRight: "3px solid #f0f0f0", borderTop: "10px solid #ffe28a"
              }} />
            }
            <div className="forCurrentTotal" style={{ width: currTotalScore + "px" }}>
              <div style={{
                position: 'absolute', content: "", height: "10px", background: "#f0f0f0",
                top: "-15px", left: currTotalScore - 5 + "px", borderLeft: "3px solid #f0f0f0", borderRight: "3px solid #f0f0f0", borderTop: "10px solid #0fa2eb"
              }} />
            </div>
          </div>
        </div>
        }
        <br></br>
        {(targetTotalScore > currTotalScore) && <p className="textForTotalChart">Your estimated GMAT score per your performance in this mock test is {currTotalScore}, which is {diffTotalScore} points lower than your target GMAT score of {targetTotalScore}.</p>
        }{(targetTotalScore === currTotalScore) && <p className="textForTotalChart">Your estimated GMAT score per your performance in this mock test is {currTotalScore}, which is equal to your target score.</p>
        }{(targetTotalScore < currTotalScore) && <p className="textForTotalChart">Your estimated GMAT score per your performance in this mock test is {currTotalScore}, which is {diffTotalScore} points higher than your target GMAT score of {targetTotalScore}.</p>
        }
      </div>
      {/* Code for quant score chart */}
      <div className="subChartsLayout">
        <form className="form">
          <div className="subCharts">
            <br></br>
            {/* Text over the indicator for quant score */}
            {(diffQuantScore > 5) && <div><h3 className="headingIdForTitleQuantChart">Quant Score <br></br><br></br> Q{props.params.valueCurrentQuant} </h3><div className="textForPITarQuant" style={{ marginLeft: (valueTargetQuant * 5) - 10 + "px" }}>Q{valueTargetQuant}</div>
              <div className="textForPICurrQuant" style={{ marginLeft: (valueCurrentQuant * 5) - 10 + "px" }}>Q{valueCurrentQuant}</div></div>
            }{(diffQuantScore > 0 && diffQuantScore <= 5) && <div><h3 className="headingIdForTitleQuantChart">Quant Score <br></br><br></br> Q{props.params.valueCurrentQuant} </h3><div className="textForPITarQuant1" style={{ marginLeft: (valueTargetQuant * 5) - 10 + "px" }}>Q{valueTargetQuant}</div>
              <div className="textForPICurrQuant" style={{ marginLeft: (valueCurrentQuant * 5) - 10 + "px" }}>Q{valueCurrentQuant}</div></div>}
            {(diffQuantScore == 0) && <div><h3 className="headingIdForTitleQuantChart">Quant Score <br></br><br></br> Q{props.params.valueCurrentQuant} </h3>
              <div className="textForPICurrQuant" style={{ marginLeft: (valueCurrentQuant * 5) - 10 + "px" }}>Q{valueCurrentQuant}</div></div>}

            {/* displaying bar chart based on different scores  */}
            {(valueTargetQuant > valueCurrentQuant) && <div className="barChartForQuant" style={{ width: "300px" }}>
              <div className="forTargetQuantVerbal" style={{ width: valueTargetQuant * 5 + "px" }}>
                {/* Indicator at top and botton depending upon the difference in score */}
                {(valueTargetQuant > valueCurrentQuant + 5) && <div style={{
                  position: 'absolute', content: "", height: "10px", background: "#FFFFFF",
                  top: "-15px", left: (valueTargetQuant * 5) - 5 + "px", borderLeft: "3px solid #ffffff", borderRight: "3px solid #ffffff", borderTop: "10px solid #ffe28a"
                }} />
                }{(valueTargetQuant <= valueCurrentQuant + 5) && <div style={{
                  position: 'absolute', content: "", height: "10px", background: "#FFFFFF",
                  bottom: "-15px", transform: "rotate(180deg)", left: (valueTargetQuant * 5) - 5 + "px", borderLeft: "3px solid #ffffff", borderRight: "3px solid #ffffff", borderTop: "10px solid #ffe28a"
                }} />}
                <div className="forCurrentQuantVerbal" style={{ width: valueCurrentQuant * 5 + "px" }}>
                  <div style={{
                    position: 'absolute', content: "", height: "10px", background: "#FFFFFF",
                    top: "-15px", left: (valueCurrentQuant * 5) - 5 + "px", borderLeft: "3px solid #ffffff", borderRight: "3px solid #ffffff", borderTop: "10px solid #0fa2eb"
                  }}></div>
                  <p className="textForDiffScore" style={{ margin: 0 + "px" + " " + " " + (valueCurrentQuant + (diffQuantScore / 2)) * 5 + "px" }}> +{diffQuantScore} </p>
                </div>
              </div>
            </div>
            }{(valueTargetQuant <= valueCurrentQuant) && <div className="barChartForQuant" style={{ width: "300px" }}>
              <div className="forTargetQuantVerbal" style={{ width: valueTargetQuant * 5 + "px" }} >
                {/* Indicator at top and botton depending upon the difference in score */}
                {(valueCurrentQuant > valueTargetQuant + 5) && <div style={{
                  position: 'absolute', content: "", height: "10px", background: "#FFFFFF",
                  top: "-15px", left: (valueTargetQuant * 5) - 5 + "px", borderLeft: "3px solid #ffffff", borderRight: "3px solid #ffffff", borderTop: "10px solid #ffe28a"
                }}></div>
                }{(valueCurrentQuant <= valueTargetQuant + 5) && <div style={{
                  position: 'absolute', content: "", height: "10px", background: "#FFFFFF",
                  bottom: "-15px", transform: "rotate(180deg)", left: (valueTargetQuant * 5) - 5 + "px", borderLeft: "3px solid #ffffff", borderRight: "3px solid #ffffff", borderTop: "10px solid #ffe28a"
                }}></div>}

                <div className="forCurrentQuantVerbal" style={{ width: valueCurrentQuant * 5 + "px" }}>
                  <div style={{
                    position: 'absolute', content: "", height: "10px", background: "#FFFFFF",
                    top: "-15px", left: (valueCurrentQuant * 5) - 5 + "px", borderLeft: "3px solid #ffffff", borderRight: "3px solid #ffffff", borderTop: "10px solid #0fa2eb"
                  }}></div>
                </div>
              </div>
            </div>
            }
            <br></br>
            {(valueTargetQuant > valueCurrentQuant) && <p className="textForQuantChart">Your estimated quantitative score per your performance in this <br></br> mock test is Q{valueCurrentQuant}, which is {diffQuantScore} points lower than your target <br></br> quantitative score of Q{valueTargetQuant}.</p>
            }{(valueTargetQuant === valueCurrentQuant) && <p className="textForQuantChart">Your estimated quantitative score per your performance in this <br></br> mock test is Q{valueCurrentQuant}, which is equal to your target <br></br> score.</p>
            }{(valueTargetQuant < valueCurrentQuant) && <p className="textForQuantChart">Your estimated quantitative score per your performance in this <br></br> mock test is Q{valueCurrentQuant}, which is {diffQuantScore} points higher than your target <br></br> quantitative score of Q{valueTargetQuant}.</p>
            }
          </div>

          {/* Code for verbal score chart */}

          <div className="subCharts1">
            <br></br>
            {/* Text over the indicator for verbal score */}
            {(diffVerbalScore > 5) && <div><h3 className="headingIdForTitleVerbalChart">Verbal Score <br></br><br></br> V{props.params.valueCurrentVerbal}</h3>
              <div className="textForPITarQuant" style={{ marginLeft: (valueTargetVerbal * 5) - 10 + "px" }}>V{valueTargetVerbal}</div>
              <div className="textForPICurrQuant" style={{ marginLeft: (valueCurrentVerbal * 5) - 10 + "px" }}>V{valueCurrentVerbal}</div></div>
            }{(diffVerbalScore > 0 && diffVerbalScore <= 5) && <div><h3 className="headingIdForTitleVerbalChart">Verbal Score <br></br><br></br> V{props.params.valueCurrentVerbal}</h3>
              <div className="textForPITarQuant1" style={{ marginLeft: (valueTargetVerbal * 5) - 10 + "px" }}>V{valueTargetVerbal}</div>
              <div className="textForPICurrQuant" style={{ marginLeft: (valueCurrentVerbal * 5) - 10 + "px" }}>V{valueCurrentVerbal}</div></div>}
            {(diffVerbalScore == 0) && <div><h3 className="headingIdForTitleVerbalChart">Verbal Score <br></br><br></br> V{props.params.valueCurrentVerbal}</h3>
              <div className="textForPICurrQuant" style={{ marginLeft: (valueCurrentVerbal * 5) - 10 + "px" }}>V{valueCurrentVerbal}</div></div>}

            {/* displaying bar chart based on different scores  */}
            {(valueTargetVerbal > valueCurrentVerbal) && <div className="barChartForVerbal" style={{ width: "300px" }}>
              <div className="forTargetQuantVerbal" style={{ width: valueTargetVerbal * 5 + "px" }}>
                {/* Indicator at top and botton depending upon the difference in score */}
                {(valueTargetVerbal > valueCurrentVerbal + 5) && <div style={{
                  position: 'absolute', content: "", height: "10px", background: "#FFFFFF",
                  top: "-15px", left: (valueTargetVerbal * 5) - 5 + "px", borderLeft: "3px solid #ffffff", borderRight: "3px solid #ffffff", borderTop: "10px solid #ffe28a"
                }} />
                }{(valueTargetVerbal <= valueCurrentVerbal + 5) && <div style={{
                  position: 'absolute', content: "", height: "10px", background: "#FFFFFF",
                  bottom: "-15px", transform: "rotate(180deg)", left: (valueTargetVerbal * 5) - 5 + "px", borderLeft: "3px solid #ffffff", borderRight: "3px solid #ffffff", borderTop: "10px solid #ffe28a"
                }} />
                }

                <div className="forCurrentQuantVerbal" style={{ width: valueCurrentVerbal * 5 + "px" }}>
                  <div style={{
                    position: 'absolute', content: "", height: "10px", background: "#FFFFFF",
                    top: "-15px", left: (valueCurrentVerbal * 5) - 5 + "px", borderLeft: "3px solid #ffffff", borderRight: "3px solid #ffffff", borderTop: "10px solid #0fa2eb"
                  }}></div>

                  <p className="textForDiffScore" style={{ margin: 0 + "px" + " " + " " + (valueCurrentVerbal + (diffVerbalScore / 2)) * 5 + "px" }}> +{diffVerbalScore} </p>
                </div>
              </div>
            </div>
            }{(valueTargetVerbal <= valueCurrentVerbal) && <div className="barChartForVerbal" style={{ width: "300px" }}>
              <div className="forTargetQuantVerbal" style={{ width: valueTargetVerbal * 5 + "px" }} >
                {/* Indicator at top and botton depending upon the difference in score */}
                {(valueCurrentVerbal > valueTargetVerbal + 5) && <div style={{
                  position: 'absolute', content: "", height: "10px", background: "#FFFFFF",
                  top: "-15px", left: (valueTargetVerbal * 5) - 5 + "px", borderLeft: "3px solid #ffffff", borderRight: "3px solid #ffffff", borderTop: "10px solid #ffe28a"
                }} />
                }{(valueCurrentVerbal <= valueTargetVerbal + 5) && <div style={{
                  position: 'absolute', content: "", height: "10px", background: "#FFFFFF",
                  bottom: "-15px", transform: "rotate(180deg)", left: (valueTargetVerbal * 5) - 5 + "px", borderLeft: "3px solid #ffffff", borderRight: "3px solid #ffffff", borderTop: "10px solid #ffe28a"
                }} />}

                <div className="forCurrentQuantVerbal" style={{ width: valueCurrentVerbal * 5 + "px" }}></div>
                <div style={{
                  position: 'absolute', content: "", height: "10px", background: "#FFFFFF",
                  top: "-15px", left: (valueCurrentVerbal * 5) - 5 + "px", borderLeft: "3px solid #ffffff", borderRight: "3px solid #ffffff", borderTop: "10px solid #0fa2eb"
                }}></div>
              </div>
            </div>
            }
            <br></br>
            {(valueTargetVerbal > valueCurrentVerbal) && <p className="textForQuantChart">Your estimated verbal score per your performance in this <br></br> mock test is V{valueCurrentVerbal}, which is {diffVerbalScore} points lower than your target <br></br> verbal score of V{valueTargetVerbal}.</p>
            }{(valueTargetVerbal === valueCurrentVerbal) && <p className="textForQuantChart">Your estimated verbal score per your performance in this <br></br> mock test is V{valueCurrentVerbal}, which is equal to your target <br></br> score.</p>
            }{(valueTargetVerbal < valueCurrentVerbal) && <p className="textForQuantChart">Your estimated verbal score per your performance in this <br></br> mock test is V{valueCurrentVerbal}, which is {diffVerbalScore} points higher than your target <br></br> verbal score of V{valueTargetVerbal}.</p>
            }
          </div>
        </form>
      </div>
    </div>
  );
}


ReactDOM.render(
  <GMATScoreForm />,
  document.getElementById('root')
);
