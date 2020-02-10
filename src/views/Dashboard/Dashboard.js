import React, { useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// axios 
import axios from "axios";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
export default function Dashboard() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);

  useEffect(() => {
    console.log('ENVTEST', process.env.REACT_APP_API_URL)
    axios.get('https://lifehub-server.herokuapp.com/api/v1/todos')
    .then(function (response) {
      // handle success
      console.log(response.data)
      setData(response.data);

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }, [])

  const setChecked = (taskId) => {
    const index = data.findIndex(x => x.id === taskId);
    const newArray = [...data]
    newArray[index]['finished'] = !newArray[index]['finished'];
    setData(newArray);
  };
  const handleTextChange = (e, taskId) => {
    const index = data.findIndex(x => x.id === taskId);
    const newArray = [...data]
    newArray[index]['description'] = e.target.value;
    setData(newArray);
  }
  const setWeight = (e, taskId) => {
    const index = data.findIndex(x => x.id === taskId);
    const newArray = [...data]
    newArray[index]['weight'] = e.target.value;
    setData(newArray);
  };
  const addTask = (category) => {
    const newArray = [...data]
    newArray.push({
      id: 0 - data.length,
      description: 'addtest',
      finished: false,
      weight: 1,
      category: category.toString(),
      created_at: null
    })
    setData(newArray);
  }
  
  const saveTask = (taskId, category) => {
    const index = data.findIndex(x => x.id.toString() === taskId.toString());
    const task = data[index];
    task.category = category
    if(task.created_at){
      axios.put('/api/v1/todos/' + task.id, task)
      .then(function (response) {
        console.log(response);
      })
    }else{
      delete task.id;
      axios.post('/api/v1/todos', task)
      .then(function (response) {
        console.log(response);
      })
    }
  }

  const deleteTask = taskId => {
    const index = data.findIndex(x => x.id.toString() === taskId.toString());
    const task = data[index];
    const newArray = [...data]
    axios.delete('/api/v1/todos/' + task.id)
    .then(function (response) {
      newArray.splice(index, 1)
      setData(newArray)
    })
  }
  
  const filterData = (filter) => {
    if(filter === 'finished'){
      return data.filter((obj) => { return obj.finished})
    }
    else{
      return data.filter((obj) => { return obj.category === filter && !obj.finished})
    }
  }
  
  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="danger"
            tabs={[
              {
                tabName: "Life",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    setChecked={setChecked}
                    setWeight={setWeight}
                    addTask={() => addTask('life')}
                    saveTask={saveTask}
                    deleteTask={deleteTask}
                    category={'life'}
                    handleTextChange={handleTextChange}
                    tasks={filterData('life')}
                  />
                )
              },
              {
                tabName: "Coding",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    setChecked={setChecked}
                    setWeight={setWeight}
                    addTask={() => addTask('coding')}
                    saveTask={saveTask}
                    deleteTask={deleteTask}
                    category={'coding'}
                    handleTextChange={handleTextChange}
                    tasks={filterData('coding')}
                  />
                )
              },
              {
                tabName: "Completed",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    setChecked={setChecked}
                    setWeight={setWeight}
                    addTask={null}
                    saveTask={saveTask}
                    deleteTask={deleteTask}
                    category={'finished'}
                    tasks={filterData('finished')}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
