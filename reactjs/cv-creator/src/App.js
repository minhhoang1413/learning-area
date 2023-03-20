import React from "react";
import CVForm from "./components/CVForm";
import CVPreview from "./components/CVPreview";
import './styles/App.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editting: true,
            name: '',
            email: '',
            phone: '',
            educations: [],
            experiences: []
        }
        this.handleChangePersonalInfo = this.handleChangePersonalInfo.bind(this)
        this.handleEditBtn = this.handleEditBtn.bind(this)
        this.addNewEducation = this.addNewEducation.bind(this)
        this.editEducation = this.editEducation.bind(this)
        this.removeEducation = this.removeEducation.bind(this)
        this.addNewExperience = this.addNewExperience.bind(this)
        this.editExperience = this.editExperience.bind(this)
        this.removeExperience = this.removeExperience.bind(this)
    }
    handleChangePersonalInfo(e) {
        const { value, name } = e.target
        this.setState({ [name]: value })
    }
    addNewEducation() {
        const newEducation = { id: 'education-' + Date.now(), school: '', date: '' }
        this.setState({ educations: this.state.educations.concat(newEducation) })
    }
    editEducation(id, key, value) {
        const edittedEducations = this.state.educations.map(obj => obj.id === id ? { ...obj, [key]: value } : obj)
        this.setState({ educations: edittedEducations })
    }
    removeEducation(id) {
        this.setState({ educations: this.state.educations.filter(e => e.id !== id) })
    }
    handleEditBtn() {
        this.setState({ editting: !this.state.editting })
    }
    addNewExperience() {
        const newExperience = { id: 'experience-' + Date.now(), company: '', date: '' }
        this.setState({ experiences: this.state.experiences.concat(newExperience) })
    }
    editExperience(id, key, value) {
        const edittedExperiences = this.state.experiences.map(obj => obj.id === id ? { ...obj, [key]: value } : obj)
        this.setState({ experiences: edittedExperiences })
    }
    removeExperience(id) {
        this.setState({ experiences: this.state.experiences.filter(e => e.id !== id) })
    }
    handleEditBtn() {
        this.setState({ editting: !this.state.editting })
    }
    render() {
        return (
            <div className="container">
                {
                    this.state.editting
                        ? <CVForm {...this.state} addNewEducation={this.addNewEducation} editEducation={this.editEducation} removeEducation={this.removeEducation} handleChangePersonalInfo={this.handleChangePersonalInfo} handleEditBtn={this.handleEditBtn}
                            addNewExperience={this.addNewExperience} editExperience={this.editExperience} removeExperience={this.removeExperience}
                        />
                        : <CVPreview {...this.state} />
                }
                <button type="button" onClick={this.handleEditBtn}>{this.state.editting ? 'cancel' : 'edit'}</button>
                {!this.state.editting && <button onClick={() => window.print()}>pdf</button>}
            </div>
        )
    }
}

export default App