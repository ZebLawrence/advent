import React, { useEffect } from 'react';
import { UncontrolledCollapse, Button } from 'reactstrap';
import Prism from 'prismjs';
// import 'prismjs/themes/prism.css';
// import 'prismjs/themes/prism-dark.css';
import 'prismjs/themes/prism-okaidia.css';

function withCodeDisplay(CodeToDisplay, codeString) {
  return class extends React.Component {
    
    componentDidMount() {
      Prism.highlightAll();
      console.log('The passed in string', codeString);
    }

    render() {
      return (
        <div>
          <CodeToDisplay {...this.props} />
          <Button id="code-coll">Code</Button>
          <UncontrolledCollapse toggler="code-coll" defaultOpen={false} >
            <pre>
              <code className="language-javascript">{codeString}</code>
            </pre>
          </UncontrolledCollapse>
        </div>
      );
    }
  }
}

export default withCodeDisplay;
