import React from "react";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import Input from '@material-ui/core/Input';
const useStyles = makeStyles(styles);

export default function Tasks(props) {
  const classes = useStyles();
  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: false
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    console.log('CurrentTarget: ', event.currentTarget)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (index, type) => {
    console.log('id', anchorEl.id)
    if(type === 'save'){
      props.saveTask(anchorEl.id, props.category)
    }
    if(type === 'delete'){
      props.deleteTask(anchorEl.id)
    }
    setAnchorEl(null);
  };

  return (
    <div>
    <Table className={classes.table}>
      <TableBody>
        {props.tasks.map((task, index) => (
          <TableRow key={index} className={classes.tableRow}>
            <TableCell className={tableCellClasses}>
              <Checkbox
                className={classes.checkbox}
                checked={task.finished}
                tabIndex={-1}
                onClick={() => props.setChecked(task.id)}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.root
                }}
              />
            </TableCell>
            <TableCell className={classes.tableCellFlex2}>
              <Input className={classes.cellInput} value={task.description} onChange={(e) => props.handleTextChange(e, task.id)}/>
            </TableCell>
            <TableCell className={tableCellClasses}>
              <Select
                labelid="demo-simple-select-label"
                id="demo-simple-select"
                value={task.weight}
                onChange={(val) => props.setWeight(val, task.id)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </TableCell>
            <TableCell className={classes.tableCellClasses}>
              <Edit
                id={task.id}
                className={
                  classes.tableActionButtonIcon + " " + classes.edit
                }
                onClick={handleClick}
              />
              <Menu
                id={task.id}
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={() => handleClose(index, 'save', props.category)}>Save</MenuItem>
                <MenuItem onClick={() => handleClose(index, 'delete', props.category)}>Delete</MenuItem>
              </Menu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
    <div className={tableCellClasses} onClick={props.addTask}>
        <Add
          className={
            classes.tableActionButtonIcon + " " + classes.edit
          }
        />
        <div className={tableCellClasses}>Add Task</div>
      </div>            
    </div>
  );
}
