import './App.css';
import React from 'react';

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ['React', 'Javascript'],
      content: ['React\nReact is an open-source JavaScript library used for building user interfaces and front-end web applications. It allows developers to create reusable UI components and efficiently manage the state of their applications, making it a powerful and versatile tool for building modern web applications.', 
      'Javascript\nJavaScript is a high-level programming language used to create interactive and dynamic websites.'],
      selectedNoteIndex: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleAddNote = this.handleAddNote.bind(this)
    this.handleGetTitle = this.handleGetTitle.bind(this)
  }

  handleChange(index, event) {
    const updatedContent = [...this.state.content];
    updatedContent[index] = event.target.value
    this.setState({
      content: updatedContent
    })
    console.log(updatedContent[index])
  }

  handleClick(event) {
    const index = parseInt(event.target.getAttribute('index'));
    this.setState({
      selectedNoteIndex: index
    })
    console.log('clicked!')
  }

  handleTitleChange(index, event) {
    const updatedTitle = [...this.state.title];
    updatedTitle[index] = event.target.value
    this.setState({
      title: updatedTitle
    })
    console.log(updatedTitle[index])
  }

  handleAddNote() {
    this.setState({
      title: [...this.state.title, ''],
      content: [...this.state.content, ''],
      selectedNoteIndex: this.state.content.length
    })
    console.log('Added Note')
  }

  handleGetTitle(index) {
    let content = this.state.content[index]
    let endOfTitle = content.indexOf("\n");
    let title = (endOfTitle !== -1 && endOfTitle <= 25) ? content.substring(0, endOfTitle) : content.substring(0, 25);
    return(
      title
    )
  }

  render() {
    return(
      <div className='row' style={{
        margin: '0'
      }}>
        <Notes names={this.state.title} 
        handleClick={this.handleClick}
        handleTitleChange={this.handleTitleChange} 
        handleGetTitle={this.handleGetTitle}/>
        <NoteDisplay notes={this.state.content} 
        handleChange={this.handleChange} 
        handleAddNote={this.handleAddNote}
        index={this.state.selectedNoteIndex}/>
      </div>
    )
  }
}

function Notes(props) {
  const names = props.names
  return(
    <div className='col-4'>
      <div style={{
        height: '10vh'
      }}>
        <h1 style={{height: '10%'}}>Notes</h1>
      </div>
      <div className='overflow-scroll' style={{
        height: '90vh'
      }}>
        {names.map((name, index) => (
          console.log(index),
          <Note key={index} name={name} 
          index={index} handleClick={props.handleClick}
          handleTitleChange={props.handleTitleChange}
          handleGetTitle={props.handleGetTitle}/>
        ))}
      </div>
    </div>
  )
}

function Note(props) {
  let title = props.handleGetTitle(props.index)
  if (title === '') {
    title = 'New note'
  }
  if (title.length > 24) {
    title = title + '...'
  }
  return(
    <div index={props.index} onClick={props.handleClick} style={{
      backgroundColor: '#dadada', padding: '2rem', 
      fontSize: '1.5rem', marginBottom: '1rem', 
      fontWeight: 'bold', cursor: 'pointer'
    }}>{title}</div>
  )
}

function NoteDisplay(props) {
  return(
    <div className='col-8'>
      <Buttons handleAddNote={props.handleAddNote} />
      <textarea style={{
        height: '89vh', width: '100%'
      }} onChange={(event) => props.handleChange(props.index, event)} 
      value={props.notes[props.index]}></textarea>
    </div>
  )
}

function Buttons(props) {
  return(
    <div style={{
      height: '10vh'
    }}>
      <div className='ms-auto' style={{
        display: 'inline-block', margin: '1.9rem'
      }}>
        <button onClick={props.handleAddNote} className='btn btn-success'><i className="fa-solid fa-plus"></i> Add Note</button>
      </div>
    </div>
  )
}

export default NotesApp;
