export default function AssignmntEditor() {
  return (
    <div id="wd-assignment-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description" cols={30} rows={10}>
        The assignment is available online Submit a link to the landing page of
        your Web Application running on Netlify. The landing should include the
        following: Your Full Name and section links to each of the lab
        assignments link to the kanbaz application Links to all relevant source
        code repositories The Kanbas application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option selected value="ASSIGNMENTS">
                ASSIGNMENTS
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Submission Type</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option selected value="Online">
                Online
              </option>
            </select>
            <br />
            <br />
            Online Enrty Options <br />
            <input
              type="checkbox"
              name="wd-submission-type"
              id="wd-text-entry"
            />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />
            <input
              type="checkbox"
              name="wd-submission-type"
              id="wd-wesite-url"
            />
            <label htmlFor="d-wesite-url">Website URL</label>
            <br />
            <input
              type="checkbox"
              name="wd-submission-type"
              id="wd-media-recordings"
            />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
            <br />
            <input
              type="checkbox"
              name="wd-submission-type"
              id="wd-student-annotation"
            />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />
            <input
              type="checkbox"
              name="wd-submission-type"
              id="wd-file-upload"
            />
            <label htmlFor="wd-file-upload">File Uploads</label>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign">Assign</label>
          </td>
          <td id="wd-assign">
            <label htmlFor="wd-assign-to">Assign To</label><br />
            <input id="wd-assign-to" defaultValue="Everyone" />
            <br /><br />
            <label htmlFor="wd-due-date">Due Date</label><br />
            <input type="date" defaultValue="2001-08-30" id="wd-due-date" />
            <br /><br />
            <table>
                <td>
                    <label htmlFor="wd-available-from">Available From</label><br />
                    <input type="date" defaultValue="2001-08-30" id="wd-available-from" />
                </td>
                <td>
                    <label htmlFor="wd-available-until">Available Until</label><br />
                    <input type="date" defaultValue="2001-08-30" id="wd-available-until" />
                </td>
            </table>
          </td>
        </tr>
      </table>
    </div>
  );
}
