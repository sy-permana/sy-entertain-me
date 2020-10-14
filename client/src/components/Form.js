import React from 'react'
import { useForm } from 'react-hook-form'

export default props => {
  const { register, handleSubmit } = useForm()

  const onSubmit = data => {
    props.handleOnSubmit(data)
  }

  return (
    <div className="row">
      <form onSubmit={handleSubmit(onSubmit)} className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="Title"
              name="title"
              type="text"
              className="validate"
              defaultValue={props.data ? props.data.title : ''}
              ref={register}
            />
            <label htmlFor="Title" className={props.data ? 'active' : ''}>Title</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea
              id="overview"
              className="materialize-textarea"
              name="overview"
              ref={register}
              defaultValue={props.data ? props.data.overview : ''}
              style={{ height: 'auto', minHeight: '100px'}}
            />
            <label htmlFor="overview" className={props.data ? 'active' : ''}>overview</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="poster_path"
              name="poster_path"
              type="text"
              className="validate"
              defaultValue={props.data ? props.data.poster_path : ''}
              ref={register}
            />
            <label htmlFor="poster_path" className={props.data ? 'active' : ''}>Poster Path</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="popularity"
              name="popularity"
              type="text"
              className="validate"
              defaultValue={props.data ? props.data.popularity : ''}
              ref={register({ pattern: /^(10|\d)(\.\d{1})?$/ })}
            />
            <label htmlFor="popularity" className={props.data ? 'active' : ''}>Popularity</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="tags"
              name="tags"
              type="text"
              className="validate"
              ref={register}
              defaultValue={props.data ? `${props.data.tags.join(',')}` : ''}
            />
            <label htmlFor="tags" className={props.data ? 'active' : ''}>Tags</label>
          </div>
        </div>
        <button className="btn waves-effect waves-light" type="submit">
          Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  )
}
