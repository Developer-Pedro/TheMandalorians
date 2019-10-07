using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Account
{
	public string Name { get; set; }

	public List<Group> Groups = new List<Group>();

	// TODO: Give raw account data
	public Account(string name) {
		Name = name;

		Groups.Add(new Group("CS441"));
		Groups.Add(new Group("Set-Up Team"));
		Groups.Add(new Group("Neighborhood Group"));
		Groups.Add(new Group("Family"));
		Groups.Add(new Group("Bars Squad"));
		Groups.Add(new Group("Fraternity"));
	}

}
